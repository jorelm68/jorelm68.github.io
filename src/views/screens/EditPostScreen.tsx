import React, { useEffect, useState, useCallback } from "react";
import Page from "../components/Page";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import { useAppSelector } from "../../data/redux/hooks";
import View from "../components/View";
import api from "../../data/server/api";
import PhotoComponent from "../components/PhotoComponent";
import { usePost } from "../../data/server/state";
import { useParams } from "react-router-dom";

// Typing for media items
type MediaItem = { type: 'photo' | 'video', content: string, caption?: string };

export default function EditPostScreen({ }): JSX.Element {
    const { post } = useParams();
    const { isAuthenticated } = useAppSelector(state => state.global);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Edit Post | Ethan McIntyre';
        dispatch(setScreen('EditPostScreen'));
    }, [dispatch]);

    // Use custom hook to fetch post data
    const { 
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
    } = usePost(post);
    
    // Initial state setup, leveraging custom hook data
    const initialFormData = {
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
    };

    const initialMediaItems = urls ? 
        urls.map((url: string, index: number) => ({
            type: url.includes('youtube') ? 'video' as const : 'photo' as const,
            content: url,
            caption: captions[index] || ''
        })) : [];

    const [formData, setFormData] = useState(initialFormData);
    const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaItems);
    const [youtubeLink, setYoutubeLink] = useState<string>('');
    const [canSubmit, setCanSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (name) {
            setFormData({
                name: name || '',
                description: description || '',
                link: link || `/post/${post}`,
                selectors: selectors || '',
                essay: essay || '',
                location: location || '',
                backgroundColor: backgroundColor || '#ffffff',
                color: color || '#000000',
                start: start || '',
                end: end || '',
            });

            setMediaItems(urls.map((url: string, index: number) => ({
                type: url.includes('youtube') ? 'video' : 'photo',
                content: url,
                caption: captions[index] || ''
            })));
        }
    }, [name, description, link, selectors, essay, location, backgroundColor, color, start, end, urls, captions, post]);

    const updateFormData = useCallback((field: string, value: any) => {
        setFormData(prevData => {
            const newData = { ...prevData, [field]: value };
            validateForm(newData, mediaItems);
            return newData;
        });
    }, [mediaItems]);

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

                const mediaUrls = await Promise.all(mediaUrlPromises);

                setMediaItems(prevMedia => {
                    const newMedia = [...prevMedia, ...mediaUrls.map(url => ({ type: 'photo' as const, content: url }))];
                    validateForm(formData, newMedia);
                    return newMedia;
                });
            } catch (error) {
                console.error('Error converting files:', error);
            }
        }
    };

    const handleCaptionChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMediaItems = [...mediaItems];
        newMediaItems[index].caption = event.target.value;
        setMediaItems(newMediaItems);
        validateForm(formData, newMediaItems);
    };

    const handleYoutubeLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYoutubeLink(event.target.value);
    };

    const addYoutubeLink = () => {
        const youtubeID = youtubeLink.split('v=')[1];
        if (youtubeID) {
            setMediaItems(prevMedia => {
                const newMedia = [...prevMedia, { type: 'video' as const, content: `https://www.youtube.com/embed/${youtubeID}` }];
                validateForm(formData, newMedia);
                return newMedia;
            });
        }
        setYoutubeLink('');
    };

    const handleRemoveMedia = (index: number) => {
        const newMediaItems = [...mediaItems];
        newMediaItems.splice(index, 1);
        setMediaItems(newMediaItems);
        validateForm(formData, newMediaItems);
    };

    const handleMoveMedia = (index: number, direction: 'up' | 'down' | 'top') => {
        const newMediaItems = [...mediaItems];

        if (direction === 'up' && index > 0) {
            [newMediaItems[index], newMediaItems[index - 1]] = [newMediaItems[index - 1], newMediaItems[index]];
        } else if (direction === 'down' && index < mediaItems.length - 1) {
            [newMediaItems[index], newMediaItems[index + 1]] = [newMediaItems[index + 1], newMediaItems[index]];
        } else if (direction === 'top' && index > 0) {
            const [movedMedia] = newMediaItems.splice(index, 1);
            newMediaItems.unshift(movedMedia);
        }

        setMediaItems(newMediaItems);
    };

    const validateForm = (data: typeof formData, media: MediaItem[]) => {
        const isValid = media.length > 0 &&
            Object.values(data).every(value => value.trim() !== '') &&
            media.every(item => item.type === 'video' || item.caption !== '');

        setCanSubmit(isValid);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (!post) return;
        event.preventDefault();
        setLoading(true);

        try {
            await api.post.updatePost(post, {
                ...formData,
                urls: mediaItems.map(item => item.content),
                captions: mediaItems.map(item => item.caption || '')
            });
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

                    {mediaItems.map((item, index) => (
                        <View key={index} style={{ marginBottom: '16px' }}>
                            {item.type === 'photo' ? (
                                <>
                                    <PhotoComponent photo={item.content} />
                                    <input
                                        type="text"
                                        placeholder={`Caption for Photo ${index + 1}`}
                                        value={item.caption || ''}
                                        onChange={handleCaptionChange(index)}
                                    />
                                </>
                            ) : (
                                <div>
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={item.content}
                                        title={`YouTube Video ${index + 1}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                    <input
                                        type="text"
                                        placeholder={`Caption for Video ${index + 1}`}
                                        value={item.caption || ''}
                                        onChange={handleCaptionChange(index)}
                                    />
                                </div>
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