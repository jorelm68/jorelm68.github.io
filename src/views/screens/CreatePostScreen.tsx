import React, { useEffect, useState, useCallback } from "react";
import Page from "../components/Page";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import { useAppSelector } from "../../data/redux/hooks";
import View from "../components/View";
import api from "../../data/server/api";
import PhotoComponent from "../components/PhotoComponent";
import { Post, Res } from "../../data/constants/types";

export default function CreatePostScreen(): JSX.Element {
    const { isAuthenticated } = useAppSelector(state => state.global);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Create Post | Ethan McIntyre';
        dispatch(setScreen('CreatePostScreen'));
    }, [dispatch]);

    // Unified state for form fields
    const [formData, setFormData] = useState<Post>({
        _id: '',
        name: '',
        description: '',
        selectors: '',
        urls: [] as string[],
        captions: [] as string[],
        essay: '',
        link: '/post/<POST>',
        color: '#000000',
        backgroundColor: '#ffffff',
        start: '2024-06-06',
        end: '2024-08-08',
        location: '',
        createdAt: new Date(),
    });
    const [youtubeLink, setYoutubeLink] = useState<string>('');
    const [loading, setLoading] = useState(false);

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

                // Create the API calls to upload the photos and get the photo IDs
                const mediaUrlPromises = mediaBase64.map(async base64 => {
                    try {
                        const res: Res = await api.photo.createPhoto(base64);
                        if (!res.success) {
                            throw new Error(res.errorMessage);
                        }
                        return `https://jorelm68-1dc8eff04a80.herokuapp.com/api/photo/readPhoto/${res.data}/1080`;
                    } catch (error) {
                        console.error('Error creating photo:', error);
                        return null; // Handle this appropriately in your app
                    }
                });

                const newMediaUrls = (await Promise.all(mediaUrlPromises)).filter(url => url !== null) as string[];

                setFormData(prevData => {
                    const newUrls = [...prevData.urls, ...newMediaUrls];
                    const newCaptions = [...prevData.captions, ...newMediaUrls.map(() => '')];
                    const newData = { ...prevData, urls: newUrls, captions: newCaptions };
                    return newData;
                });
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

    const handleYoutubeLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYoutubeLink(event.target.value);
    };

    const addYoutubeLink = () => {
        let youtubeID = youtubeLink.split('v=')[1];

        if (!youtubeID) {
            youtubeID = youtubeLink.split('/shorts/')[1];
        }
        if (youtubeID) {
            const youtubeUrl = `https://www.youtube.com/embed/${youtubeID}`;
            setFormData(prevData => {
                const newUrls = [...prevData.urls, youtubeUrl];
                const newCaptions = [...prevData.captions, ''];
                const newData = { ...prevData, urls: newUrls, captions: newCaptions };
                return newData;
            });
        }
        setYoutubeLink('');
    };

    const handleRemoveMedia = (index: number) => {
        setFormData(prevData => {
            const newUrls = [...prevData.urls];
            const newCaptions = [...prevData.captions];
            newUrls.splice(index, 1);
            newCaptions.splice(index, 1);
            const newData = { ...prevData, urls: newUrls, captions: newCaptions };
            return newData;
        });
    };

    const handleMoveMedia = (index: number, direction: 'up' | 'down' | 'top') => {
        setFormData(prevData => {
            const newUrls = [...prevData.urls];
            const newCaptions = [...prevData.captions];

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

            const newData = { ...prevData, urls: newUrls, captions: newCaptions };
            return newData;
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            await api.post.createPost(formData);
        } catch (error) {
            console.error('Error creating post:', error);
        }

        setLoading(false);
    };

    if (!isAuthenticated) {
        return (
            <Page style={{ backgroundColor: 'white' }}>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
                    <h1>Create Post Screen</h1>
                    <p>Please authenticate to access this page.</p>
                </View>
            </Page>
        );
    }

    return (
        <Page style={{ backgroundColor: 'white' }}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
                <h1>Create Post Screen</h1>

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

                    <View style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
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

                    <button type="submit" disabled={loading}>Create Post</button>
                </form>
            </View>
        </Page>
    );
}