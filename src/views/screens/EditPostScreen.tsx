import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "../components/Page";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import { useAppSelector } from "../../data/redux/hooks";
import View from "../components/View";
import api from "../../data/server/api";
import PhotoComponent from "../components/PhotoComponent";
import { usePost } from "../../data/server/state";

export default function EditPostScreen() {
    const { post } = useParams();
    const { isAuthenticated } = useAppSelector(state => state.global);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setScreen('EditPostScreen'));
    }, [dispatch]);

    // State for form fields
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectors, setSelectors] = useState('');
    const [mediaBase64, setMediaBase64] = useState<string[]>([]);
    const [captions, setCaptions] = useState<string[]>([]);
    const [essay, setEssay] = useState('');
    const [location, setLocation] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [link, setLink] = useState('');
    const [color, setColor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [loading, setLoading] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);

    const data = usePost(post);
    useEffect(() => {
        if (data) {
            const {
                name: initialName,
                description: initialDescription,
                selectors: initialSelectors,
                media: initialMedia,
                captions: initialCaptions,
                essay: initialEssay,
                location: initialLocation,
                start: initialStart,
                end: initialEnd,
                link: initialLink,
                color: initialColor,
                backgroundColor: initialBackgroundColor
            } = data;

            setName(initialName);
            setDescription(initialDescription);
            setSelectors(initialSelectors);
            setMediaBase64(initialMedia);
            setCaptions(initialCaptions);
            setEssay(initialEssay);
            setLocation(initialLocation);
            setStart(initialStart);
            setEnd(initialEnd);
            setLink(initialLink);
            setColor(initialColor);
            setBackgroundColor(initialBackgroundColor);
        }
    }, [data]);

    // Handle input changes
    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setter(event.target.value);
        setCanSubmit(validateForm());
    };

    const handleMediaChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);

            // Convert media files to Base64
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
                const newMediaBase64 = await Promise.all(mediaBase64Promises);
                setMediaBase64(prevMedia => [...prevMedia, ...newMediaBase64]);
                setCaptions(prevCaptions => [...prevCaptions, ...new Array(newMediaBase64.length).fill('')]); // Initialize captions for new files
                setCanSubmit(validateForm());
            } catch (error) {
                console.error('Error converting files:', error);
            }
        }
    };

    const handleCaptionChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCaptions = [...captions];
        newCaptions[index] = event.target.value;
        setCaptions(newCaptions);
        setCanSubmit(validateForm());
    };

    const handleRemoveMedia = (index: number) => {
        const newMediaBase64 = [...mediaBase64];
        const newCaptions = [...captions];
        newMediaBase64.splice(index, 1);
        newCaptions.splice(index, 1);
        setMediaBase64(newMediaBase64);
        setCaptions(newCaptions);
        setCanSubmit(validateForm());
    };

    const validateForm = () => {
        if (mediaBase64.length === 0) {
            return false;
        }

        if (mediaBase64.length !== captions.length) {
            return false;
        }

        if (captions.some(caption => caption === '')) {
            return false;
        }

        if (name === '') {
            return false;
        }

        if (description === '') {
            return false;
        }

        if (essay === '') {
            return false;
        }

        if (location === '') {
            return false;
        }

        if (start === '') {
            return false;
        }

        if (end === '') {
            return false;
        }

        if (link === '') {
            return false;
        }

        if (color === '') {
            return false;
        }

        if (backgroundColor === '') {
            return false;
        }

        // If all checks pass, return true
        return true;
    };

    const handleMoveImage = (index: number, direction: 'up' | 'down' | 'top') => {
        const newMediaBase64 = [...mediaBase64];
        const newCaptions = [...captions];

        if (direction === 'up' && index > 0) {
            [newMediaBase64[index], newMediaBase64[index - 1]] = [newMediaBase64[index - 1], newMediaBase64[index]];
            [newCaptions[index], newCaptions[index - 1]] = [newCaptions[index - 1], newCaptions[index]];
        } else if (direction === 'down' && index < mediaBase64.length - 1) {
            [newMediaBase64[index], newMediaBase64[index + 1]] = [newMediaBase64[index + 1], newMediaBase64[index]];
            [newCaptions[index], newCaptions[index + 1]] = [newCaptions[index + 1], newCaptions[index]];
        } else if (direction === 'top' && index > 0) {
            const [movedMedia] = newMediaBase64.splice(index, 1);
            const [movedCaption] = newCaptions.splice(index, 1);
            newMediaBase64.unshift(movedMedia);
            newCaptions.unshift(movedCaption);
        }

        setMediaBase64(newMediaBase64);
        setCaptions(newCaptions);
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (!post) return console.error('No post ID provided for editing');

        setLoading(true);
        event.preventDefault();

        try {
            await api.post.updatePost(post, {
                name,
                description,
                selectors,
                media: mediaBase64, // Use Base64 encoded media
                captions,
                essay,
                location,
                start,
                end,
                link,
                color,
                backgroundColor,
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
            <form onSubmit={handleSubmit}>
                <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '32px', width: '100%' }}>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleChange(setName)}
                            required
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleChange(setDescription)}
                            required
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px', height: '100px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="selectors">Selectors:</label>
                        <input
                            type="text"
                            id="selectors"
                            value={selectors}
                            onChange={handleChange(setSelectors)}
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="media">Media:</label>
                        <input
                            type="file"
                            id="media"
                            accept="image/*,video/*"
                            onChange={handleMediaChange}
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                            multiple
                        />
                    </div>

                    {mediaBase64.map((media, index) => (
                        <div key={index} style={{ marginBottom: '16px' }}>
                            <label htmlFor={`caption-${index}`}>Caption for Media {index + 1}:</label>
                            <PhotoComponent
                                photo={media}
                                style={{ display: 'block', width: 'auto', maxHeight: '200px', height: '100%' }}
                            />
                            <input
                                type="text"
                                id={`caption-${index}`}
                                value={captions[index]}
                                onChange={handleCaptionChange(index)}
                                required
                                style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                            />
                            <button
                                    type="button"
                                    onClick={() => handleMoveImage(index, 'up')}
                                    disabled={index === 0}
                                    style={{ marginRight: '8px' }}
                                >
                                    Move Up
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleMoveImage(index, 'down')}
                                    disabled={index === mediaBase64.length - 1}
                                    style={{ marginRight: '8px' }}
                                >
                                    Move Down
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleMoveImage(index, 'top')}
                                    disabled={index === 0}
                                    style={{ marginRight: '8px' }}
                                >
                                    Move to Top
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveMedia(index)}
                                    style={{ backgroundColor: 'red', color: 'white' }}
                                >
                                    Remove Media
                                </button>
                        </div>
                    ))}

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="essay">Essay:</label>
                        <textarea
                            id="essay"
                            value={essay}
                            onChange={handleChange(setEssay)}
                            required
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px', height: '100px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={handleChange(setLocation)}
                            required
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="start">Start Date:</label>
                        <input
                            type="date"
                            id="start"
                            value={start}
                            onChange={handleChange(setStart)}
                            required
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="end">End Date:</label>
                        <input
                            type="date"
                            id="end"
                            value={end}
                            onChange={handleChange(setEnd)}
                            required
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="link">Link:</label>
                        <input
                            type="text"
                            id="link"
                            value={link}
                            onChange={handleChange(setLink)}
                            required
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="color">Color:</label>
                        <input
                            type="color"
                            id="color"
                            value={color}
                            onChange={handleChange(setColor)}
                            required
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="backgroundColor">Background Color:</label>
                        <input
                            type="color"
                            id="backgroundColor"
                            value={backgroundColor}
                            onChange={handleChange(setBackgroundColor)}
                            required
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>
                </View>

                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                    <button type="submit" disabled={!canSubmit || loading} style={{ padding: '8px 16px', fontSize: '16px' }}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </Page>
    );
}