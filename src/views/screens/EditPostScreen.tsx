import React, { useEffect, useState, useCallback } from "react";
import Page from "../components/Page";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import { useAppSelector } from "../../data/redux/hooks";
import View from "../components/View";
import { useParams } from "react-router-dom";
import api from "../../data/server/api";
import PhotoComponent from "../components/PhotoComponent";
import { usePost } from "../../data/server/state";
import { Post } from "../../data/constants/types";

export default function EditPostScreen(): JSX.Element {
    const { post: postId } = useParams<{ post: string }>();
    const { isAuthenticated } = useAppSelector(state => state.global);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Edit Post | Ethan McIntyre';
        dispatch(setScreen('EditPostScreen'));
    }, [dispatch]);

    // Use custom hook to fetch post data
    const {
        _id,
        name, 
        description, 
        link, 
        selectors, 
        essay, 
        location, 
        backgroundColor, 
        color, 
        start, 
        end, 
        urls, 
        captions, 
        createdAt,
    } = usePost(postId);
    
    // Initial state setup, leveraging custom hook data
    const initialFormData: Post = {
        _id: _id || '',
        name: name || '',
        description: description || '',
        link: link || `post/${postId}`,
        selectors: selectors || '',
        essay: essay || '',
        location: location || '',
        backgroundColor: backgroundColor || '#ffffff',
        color: color || '#000000',
        start: start || '',
        end: end || '',
        urls: urls || [],
        captions: captions || [],
        createdAt: createdAt || new Date(),
    };

    const [formData, setFormData] = useState(initialFormData);
    const [youtubeLink, setYoutubeLink] = useState<string>('');
    const [canSubmit, setCanSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (name) {
            setFormData({
                _id: _id || '',
                name: name || '',
                description: description || '',
                link: link || `post/${postId}`,
                selectors: selectors || '',
                essay: essay || '',
                location: location || '',
                backgroundColor: backgroundColor || '#ffffff',
                color: color || '#000000',
                start: start || '',
                end: end || '',
                urls: urls || [],
                captions: captions || [],
                createdAt: createdAt || new Date(),
            });
        }
    }, [name, description, link, selectors, essay, location, backgroundColor, color, start, end, urls, captions, postId]);

    const updateFormData = useCallback((field: string, value: any) => {
        setFormData(prevData => {
            const newData = { ...prevData, [field]: value };
            validateForm(newData);
            return newData;
        });
    }, []);

    const handleMediaChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);

            const mediaBase64Promises = filesArray.map(file => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        if (reader.result) {
                            resolve(reader.result as string);
                        } else {
                            reject('Failed to convert file');
                        }
                    };
                    reader.readAsDataURL(file);
                });
            });

            try {
                const mediaBase64 = await Promise.all(mediaBase64Promises);

                const mediaUrlPromises = mediaBase64.map(async base64 => {
                    const photoId = await api.photo.createPhoto(base64);
                    return `https://jorelm68-1dc8eff04a80.herokuapp.com/api/photo/readPhoto/${photoId}/1080`;
                });

                const mediaUrls = await Promise.all(mediaUrlPromises).then(urls => urls.filter(url => url !== null) as string[]);

                updateFormData('urls', [...formData.urls, ...mediaUrls]);
                updateFormData('captions', [...formData.captions, ...mediaUrls.map(() => '')]);
            } catch (error) {
                console.error('Error converting files:', error);
            }
        }
    };

    const handleCaptionChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCaptions = [...formData.captions];
        newCaptions[index] = event.target.value;
        updateFormData('captions', newCaptions);
    };

    const handleYoutubeLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYoutubeLink(event.target.value);
    };

    const addYoutubeLink = () => {
        const youtubeID = youtubeLink.split('v=')[1];
        if (youtubeID) {
            const youtubeUrl = `https://www.youtube.com/embed/${youtubeID}`;
            const newUrls = [...formData.urls, youtubeUrl];
            const newCaptions = [...formData.captions, ''];
            updateFormData('urls', newUrls);
            updateFormData('captions', newCaptions);
        }
        setYoutubeLink('');
    };

    const handleRemoveMedia = (index: number) => {
        const newUrls = [...formData.urls];
        const newCaptions = [...formData.captions];
        newUrls.splice(index, 1);
        newCaptions.splice(index, 1);
        updateFormData('urls', newUrls);
        updateFormData('captions', newCaptions);
    };

    const handleMoveMedia = (index: number, direction: 'up' | 'down' | 'top') => {
        const newUrls = [...formData.urls];
        const newCaptions = [...formData.captions];

        if (direction === 'up' && index > 0) {
            [newUrls[index], newUrls[index - 1]] = [newUrls[index - 1], newUrls[index]];
            [newCaptions[index], newCaptions[index - 1]] = [newCaptions[index - 1], newCaptions[index]];
        } else if (direction === 'down' && index < newUrls.length - 1) {
            [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
            [newCaptions[index], newCaptions[index + 1]] = [newCaptions[index + 1], newCaptions[index]];
        } else if (direction === 'top' && index > 0) {
            const [movedUrl] = newUrls.splice(index, 1);
            const [movedCaption] = newCaptions.splice(index, 1);
            newUrls.unshift(movedUrl);
            newCaptions.unshift(movedCaption);
        }

        updateFormData('urls', newUrls);
        updateFormData('captions', newCaptions);
    };

    const validateForm = (data: typeof formData) => {
        // Make sure every field has a value
        const isValid = Object.values(data).every(value => value !== '');
        setCanSubmit(isValid);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            await api.post.updatePost(formData._id, formData);
        } catch (error) {
            console.error('Error updating post:', error);
        }

        setLoading(false);
    };

    if (!isAuthenticated) {
        return (
            <Page style={{ backgroundColor: 'white' }}>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
                    <h1>Edit Post Screen</h1>
                    <p>Please authenticate to access this page.</p>
                </View>
            </Page>
        );
    }

    return (
        <Page style={{ backgroundColor: 'white' }}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
                <h1>Edit Post Screen</h1>

                <form onSubmit={handleSubmit}>
                    <View>
                        <label htmlFor="name">Name:</label>
                        <input id="name" type="text" value={formData.name} onChange={e => updateFormData('name', e.target.value)} />
                    </View>

                    <View>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" value={formData.description} onChange={e => updateFormData('description', e.target.value)} />
                    </View>

                    <View>
                        <label htmlFor="link">Link:</label>
                        <input id="link" type="text" value={formData.link} onChange={e => updateFormData('link', e.target.value)} />
                    </View>

                    <View>
                        <label htmlFor="essay">Essay:</label>
                        <textarea id="essay" value={formData.essay} onChange={e => updateFormData('essay', e.target.value)} />
                    </View>

                    <View>
                        <label htmlFor="selectors">Selectors:</label>
                        <input id="selectors" type="text" value={formData.selectors} onChange={e => updateFormData('selectors', e.target.value)} />
                    </View>

                    <View>
                        <label htmlFor="location">Location:</label>
                        <input id="location" type="text" value={formData.location} onChange={e => updateFormData('location', e.target.value)} />
                    </View>

                    <View>
                        <label htmlFor="backgroundColor">Background Color:</label>
                        <input id="backgroundColor" type="color" value={formData.backgroundColor} onChange={e => updateFormData('backgroundColor', e.target.value)} />
                    </View>

                    <View>
                        <label htmlFor="color">Text Color:</label>
                        <input id="color" type="color" value={formData.color} onChange={e => updateFormData('color', e.target.value)} />
                    </View>

                    <View>
                        <label htmlFor="start">Start Date:</label>
                        <input id="start" type="date" value={formData.start} onChange={e => updateFormData('start', e.target.value)} />
                    </View>

                    <View>
                        <label htmlFor="end">End Date:</label>
                        <input id="end" type="date" value={formData.end} onChange={e => updateFormData('end', e.target.value)} />
                    </View>

                    <View>
                        <label htmlFor="mediaUpload">Upload Photos:</label>
                        <input id="mediaUpload" type="file" multiple accept="image/*" onChange={handleMediaChange} />
                    </View>

                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            id="youtubeLink"
                            type="url"
                            placeholder="Enter YouTube Video URL"
                            value={youtubeLink}
                            onChange={handleYoutubeLinkChange}
                        />
                        <button type="button" onClick={addYoutubeLink}>Add YouTube Video</button>
                    </View>

                    {formData.urls.map((url, index) => (
                        <View key={index} style={{ marginBottom: '16px' }}>
                            {url.includes('youtube') ? (
                                <div>
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={url}
                                        title={`YouTube Video ${index + 1}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                    <input
                                        type="text"
                                        placeholder={`Caption for Video ${index + 1}`}
                                        value={formData.captions[index] || ''}
                                        onChange={handleCaptionChange(index)}
                                    />
                                </div>
                            ) : (
                                <>
                                    <PhotoComponent photo={url} />
                                    <input
                                        type="text"
                                        placeholder={`Caption for Photo ${index + 1}`}
                                        value={formData.captions[index] || ''}
                                        onChange={handleCaptionChange(index)}
                                    />
                                </>
                            )}
                            <button type="button" onClick={() => handleMoveMedia(index, 'up')}>Move Up</button>
                            <button type="button" onClick={() => handleMoveMedia(index, 'down')}>Move Down</button>
                            <button type="button" onClick={() => handleMoveMedia(index, 'top')}>Move to Top</button>
                            <button type="button" onClick={() => handleRemoveMedia(index)}>Remove</button>
                        </View>
                    ))}

                    <button type="submit" disabled={!canSubmit || loading}>Update Post</button>
                </form>
            </View>
        </Page>
    );
}