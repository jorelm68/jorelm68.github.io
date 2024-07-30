import { useEffect, useState } from "react";
import Page from "../components/Page";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import { useAppSelector } from "../../data/redux/hooks";
import View from "../components/View";
import api from "../../data/server/api";
import PostRawComponent from "../components/PostRawComponent";

export default function CreatePostScreen() {
    const { isAuthenticated } = useAppSelector(state => state.global);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setScreen('CreatePostScreen'));
    }, [dispatch]);

    // State for form fields
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectors, setSelectors] = useState('');
    const [mediaBase64, setMediaBase64] = useState<string[]>([]); // State to hold Base64 encoded media
    const [captions, setCaptions] = useState<string[]>([]); // State to hold captions
    const [essay, setEssay] = useState('');
    const [location, setLocation] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [link, setLink] = useState('/');
    const [color, setColor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [canSubmit, setCanSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

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
                const mediaBase64 = await Promise.all(mediaBase64Promises);
                setMediaBase64(mediaBase64);
                setCaptions(new Array(mediaBase64.length).fill('')); // Initialize captions for new files
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

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();

        try {
            await api.post.createPost({
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
            <form onSubmit={handleSubmit}>
                <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '16px', width: '100%' }}>
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
                        <label htmlFor="media">Upload Media:</label>
                        <input
                            type="file"
                            id="media"
                            accept="image/*"
                            multiple
                            onChange={handleMediaChange}
                            style={{ display: 'block' }}
                        />
                    </div>

                    {mediaBase64.length > 0 && mediaBase64.map((_, index) => (
                        <div key={index} style={{ marginBottom: '16px' }}>
                            <label htmlFor={`caption-${index}`}>Caption for Media {index + 1}:</label>
                            <input
                                type="text"
                                id={`caption-${index}`}
                                value={captions[index]}
                                onChange={handleCaptionChange(index)}
                                style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                            />
                        </div>
                    ))}

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="essay">Essay:</label>
                        <textarea
                            id="essay"
                            value={essay}
                            onChange={handleChange(setEssay)}
                            required
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px', height: '150px' }}
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
                        <label htmlFor="start">Start:</label>
                        <input
                            type="text"
                            id="start"
                            value={start}
                            onChange={handleChange(setStart)}
                            required
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="end">End:</label>
                        <input
                            type="text"
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
                            type="text"
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
                            type="text"
                            id="backgroundColor"
                            value={backgroundColor}
                            onChange={handleChange(setBackgroundColor)}
                            required
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    {canSubmit && !loading && (
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                border: 'none',
                                borderRadius: '5px',
                                backgroundColor: '#007BFF',
                                color: '#FFFFFF',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                        >
                            Submit
                        </button>
                    )}

                    {loading && (
                        <p>Loading...</p>
                    )}
                </View>
            </form>

            <View style={{ display: 'flex', alignSelf: 'flex-start', border: '1px solid #000', marginBottom: 8, borderRadius: 8 }}>
                <PostRawComponent
                    name={name}
                    description={description}
                    media={mediaBase64} // Use Base64 encoded media
                    link={link}
                    color={color}
                    backgroundColor={backgroundColor}
                />
            </View>
        </Page >
    );
}
