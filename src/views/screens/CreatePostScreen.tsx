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
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoBase64, setPhotoBase64] = useState<string | null>(null); // State to hold Base64 data
    const [link, setLink] = useState('');
    const [maxWidth, setMaxWidth] = useState('');
    const [maxHeight, setMaxHeight] = useState('');
    const [minWidth, setMinWidth] = useState('');
    const [minHeight, setMinHeight] = useState('');
    const [photoWidth, setPhotoWidth] = useState('');
    const [photoHeight, setPhotoHeight] = useState('');
    const [color, setColor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [flexDirection, setFlexDirection] = useState('');

    const [canSubmit, setCanSubmit] = useState(false);

    // Handle input changes
    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCanSubmit(false);
        setter(event.target.value);

        // Validate the form fields
        setTimeout(() => {
            if (name && description && photoBase64 && link && maxWidth && maxHeight && minWidth && minHeight && photoWidth && photoHeight && color && backgroundColor && flexDirection) {
                setCanSubmit(true);
            } else {
                setCanSubmit(false);
            }
        }, 10);
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setCanSubmit(false);
            const file = event.target.files[0];
            setPhoto(file);

            // Convert the image file to a Base64 string
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setPhotoBase64(reader.result as string);
                }
            };
            reader.readAsDataURL(file);

            // Validate the form fields
            setTimeout(() => {
                if (name && description && photoBase64 && link && maxWidth && maxHeight && minWidth && minHeight && photoWidth && photoHeight && color && backgroundColor && flexDirection) {
                    setCanSubmit(true);
                } else {
                    setCanSubmit(false);
                }
            }, 10);
        }
    };

    const [loading, setLoading] = useState(false);
    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();

        await api.post.createPost(
            name,
            description,
            selectors,
            photoBase64 as string, // We know this is not null because we can submit
            link,
            maxWidth,
            minWidth,
            minHeight,
            maxHeight,
            photoWidth,
            photoHeight,
            color,
            backgroundColor,
            flexDirection,
            new Date().toISOString(),
        )

        // You can dispatch an action or call an API to save the form data
        setLoading(false);
    };

    if (!isAuthenticated) {
        return (
            <Page style={{
                backgroundColor: 'white',
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}>
                    <h1>Create Post Screen</h1>
                    <p>Please authenticate to access this page.</p>
                </View>
            </Page>
        );
    }

    return (
        <Page style={{
            backgroundColor: 'white',
        }}>
            <View style={{
                display: 'flex',
                alignSelf: 'flex-start',
                border: '1px solid #000',
                marginBottom: 8,
                borderRadius: 8,
            }}>
                <PostRawComponent
                    name={name}
                    description={description}
                    photoBase64={photoBase64}
                    link={link}
                    maxWidth={maxWidth}
                    minWidth={minWidth}
                    minHeight={minHeight}
                    maxHeight={maxHeight}
                    photoWidth={photoWidth}
                    photoHeight={photoHeight}
                    color={color}
                    backgroundColor={backgroundColor}
                    flexDirection={flexDirection}
                />
            </View>

            <form onSubmit={handleSubmit}>
                <View style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    gap: '16px',
                    width: '100%',
                }}>
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
                        <label htmlFor="photo">Upload Photo:</label>
                        <input
                            type="file"
                            id="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            style={{ display: 'block' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="link">Link:</label>
                        <input
                            type="text"
                            id="link"
                            value={link}
                            onChange={handleChange(setLink)}
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="maxWidth">Max Width:</label>
                        <input
                            type="text"
                            id="maxWidth"
                            value={maxWidth}
                            onChange={handleChange(setMaxWidth)}
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="maxHeight">Max Height:</label>
                        <input
                            type="text"
                            id="maxHeight"
                            value={maxHeight}
                            onChange={handleChange(setMaxHeight)}
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="minWidth">Min Width:</label>
                        <input
                            type="text"
                            id="minWidth"
                            value={minWidth}
                            onChange={handleChange(setMinWidth)}
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="minHeight">Min Height:</label>
                        <input
                            type="text"
                            id="minHeight"
                            value={minHeight}
                            onChange={handleChange(setMinHeight)}
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="photoWidth">Photo Width:</label>
                        <input
                            type="text"
                            id="photoWidth"
                            value={photoWidth}
                            onChange={handleChange(setPhotoWidth)}
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="photoHeight">Photo Height:</label>
                        <input
                            type="text"
                            id="photoHeight"
                            value={photoHeight}
                            onChange={handleChange(setPhotoHeight)}
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
                            style={{ display: 'block', width: '100%', padding: '8px', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="flexDirection">Flex Direction:</label>
                        <input
                            type="text"
                            id="flexDirection"
                            value={flexDirection}
                            onChange={handleChange(setFlexDirection)}
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
        </Page >
    );
}
