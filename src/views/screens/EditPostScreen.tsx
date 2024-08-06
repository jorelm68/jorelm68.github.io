import React, { useEffect, useState, useCallback } from "react";
import Page from "../components/Page";
import { useDispatch } from "react-redux";
import { setScreen } from "../../lib/redux/global.reducer";
import { useAppSelector } from "../../lib/redux/hooks";
import View from "../components/View";
import { useParams } from "react-router-dom";
import api from "../../lib/server/api";
import PhotoComponent from "../components/PhotoComponent";
import { usePost } from "../../lib/server/state";
import { Direction, Post, Res } from "../../lib/constants/types";
import constants from "../../lib/constants/constants";
import colors from "../../lib/constants/colors";

const DOCUMENT_TITLE = 'Edit Post | Ethan McIntyre';

export default function EditPostScreen(): JSX.Element {
    const { post } = useParams<{ post: string }>();
    const { isAuthenticated } = useAppSelector(state => state.global);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = DOCUMENT_TITLE;
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
    } = usePost(post);

    const initialFormData: Post = {
        _id: _id || '',
        name: name || '',
        description: description || '',
        link: link || `post/${post}`,
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
    const [url, setUrl] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (name) {
            setFormData({
                _id: _id || '',
                name: name || '',
                description: description || '',
                link: link || `post/${post}`,
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
    }, [_id, name, description, link, selectors, essay, location, backgroundColor, color, start, end, urls, captions, post, createdAt]);

    const updateFormData = useCallback((field: string, value: any) => {
        setFormData(prevData => {
            const newData = { ...prevData, [field]: value };
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
                    const res: Res = await api.photo.createPhoto(base64);
                    if (!res.success) {
                        throw new Error(res.errorMessage);
                    }
                    return `${constants.PHOTO_ENDPOINT}${res.data}/${constants.RESOLUTION}`;
                });

                const mediaUrls = await Promise.all(mediaUrlPromises).then(urls => urls.filter(url => url !== null) as string[]);

                updateFormData('urls', [...formData.urls, ...mediaUrls]);
                updateFormData('captions', [...formData.captions, ...mediaUrls.map(() => '')]);
            } catch (error) {
                console.error('Error converting files:', error);
            }
        }
    };

    const handleCaptionChange = (index: number) => (event: { target: { value: string; }; }) => {
        const newCaptions = [...formData.captions];
        newCaptions[index] = event.target.value;
        updateFormData('captions', newCaptions);
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    const addUrl = () => {
        if (url.includes('youtube')) {
            let youtubeID = url.split('v=')[1];

            if (!youtubeID) {
                youtubeID = url.split('/shorts/')[1];
            }
            if (youtubeID) {
                const youtubeUrl = `${constants.YOUTUBE_ENDPOINT}${youtubeID}`;
                const newUrls = [...formData.urls, youtubeUrl];
                const newCaptions = [...formData.captions, ''];
                updateFormData('urls', newUrls);
                updateFormData('captions', newCaptions);
            }
        }
        else {
            const newUrls = [...formData.urls, url];
            const newCaptions = [...formData.captions, ''];
            updateFormData('urls', newUrls);
            updateFormData('captions', newCaptions);
        }
        
        setUrl('');
    };

    const handleRemoveMedia = (index: number) => {
        const newUrls = [...formData.urls];
        const newCaptions = [...formData.captions];
        newUrls.splice(index, 1);
        newCaptions.splice(index, 1);
        updateFormData('urls', newUrls);
        updateFormData('captions', newCaptions);
    };

    const handleMoveMedia = (index: number, direction: Direction) => {
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

    console.log(formData);

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
            <Page style={{ backgroundColor: colors.white }}>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
                    <h1>Edit Post Screen</h1>
                    <p>Please authenticate to access this page.</p>
                </View>
            </Page>
        );
    }

    return (
        <Page style={{ backgroundColor: colors.white }}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
                <h1>Edit Post Screen</h1>

                <form onSubmit={handleSubmit}>
                    <View>
                        <label htmlFor="name">Name:</label>
                        <input id="name" type="text" value={formData.name} onChange={e => updateFormData('name', e.target.value)} />
                    </View>

                    <View>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={e => updateFormData('description', e.target.value)}
                            style={{
                                width: '100%', // Ensure it takes up the full width of its container
                                resize: 'none', // Prevent manual resizing by the user, optional
                                overflow: 'hidden', // Hide the scrollbar when the text area expands
                            }}
                            rows={1} // Start with a single row
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto'; // Reset height to auto to calculate new height
                                target.style.height = `${target.scrollHeight}px`; // Set height based on scrollHeight
                            }}
                        />
                    </View>

                    <View>
                        <label htmlFor="link">Link:</label>
                        <input id="link" type="text" value={formData.link} onChange={e => updateFormData('link', e.target.value)} />
                    </View>

                    <View>
                        <label htmlFor="essay">Essay:</label>
                        <textarea
                            id="essay"
                            value={formData.essay}
                            onChange={e => updateFormData('essay', e.target.value)}
                            style={{
                                width: '100%', // Ensure it takes up the full width of its container
                                resize: 'none', // Prevent manual resizing by the user, optional
                                overflow: 'hidden', // Hide the scrollbar when the text area expands
                            }}
                            rows={1} // Start with a single row
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto'; // Reset height to auto to calculate new height
                                target.style.height = `${target.scrollHeight}px`; // Set height based on scrollHeight
                            }}
                        />
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
                            id="url"
                            type="url"
                            placeholder="Enter YouTube Video URL"
                            value={url}
                            onChange={handleUrlChange}
                        />
                        <button type="button" onClick={addUrl}>Add Url</button>
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
                                    <textarea
                                        placeholder={`Caption for Video ${index + 1}`}
                                        value={formData.captions[index] || ''}
                                        onChange={handleCaptionChange(index)}
                                        style={{
                                            width: '100%', // Ensure it takes up the full width of its container
                                            resize: 'none', // Prevent manual resizing by the user, optional
                                            overflow: 'hidden', // Hide the scrollbar when the text area expands
                                        }}
                                        rows={1} // Start with a single row
                                        onInput={(e) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            target.style.height = 'auto'; // Reset height to auto to calculate new height
                                            target.style.height = `${target.scrollHeight}px`; // Set height based on scrollHeight
                                        }}
                                    />
                                </div>
                            ) : (
                                <>
                                    <PhotoComponent photo={url} style={{
                                        height: '200px',
                                        width: 'auto',
                                        objectFit: 'cover',
                                    }} />
                                    <br />
                                    <textarea
                                        placeholder={`Caption for Photo ${index + 1}`}
                                        value={formData.captions[index] || ''}
                                        onChange={handleCaptionChange(index)}
                                        style={{
                                            width: '100%', // Ensure it takes up the full width of its container
                                            resize: 'none', // Prevent manual resizing by the user, optional
                                            overflow: 'hidden', // Hide the scrollbar when the text area expands
                                        }}
                                        rows={1} // Start with a single row
                                        onInput={(e) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            target.style.height = 'auto'; // Reset height to auto to calculate new height
                                            target.style.height = `${target.scrollHeight}px`; // Set height based on scrollHeight
                                        }}
                                    />
                                </>
                            )}
                            <button type="button" onClick={() => handleMoveMedia(index, 'up')}>Move Up</button>
                            <button type="button" onClick={() => handleMoveMedia(index, 'down')}>Move Down</button>
                            <button type="button" onClick={() => handleMoveMedia(index, 'top')}>Move to Top</button>
                            <button type="button" onClick={() => handleRemoveMedia(index)}>Remove</button>
                        </View>
                    ))}

                    <button type="submit" disabled={loading}>Update Post</button>
                </form>
            </View>
        </Page>
    );
}