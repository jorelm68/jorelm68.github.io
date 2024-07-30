import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import Page from "../components/Page";
import PhotoComponent from "../components/PhotoComponent";
import photos from "../../data/constants/photos";
import Text from "../components/Text";
import View from "../components/View";
import files from "../../data/constants/files";

export default function ContactScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setScreen('ContactScreen'));
    }, [dispatch])

    const handleDownload = () => {
        // URL of the PDF file
        const resumeUrl = files.resume; // Make sure this is a URL

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Ethan_McIntyre.pdf';

        // Append the link to the document and trigger a click to start the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
    };

    return (
        <Page style={{
            alignItems: 'center',
        }}>
            <PhotoComponent
                photo={photos.handshake}
                resolution={1080}
                style={{
                    width: '50%',
                    height: 'auto',
                }}
            />

            <Text style={{
                color: 'rgba(255, 255, 255, 0.75)',
                fontSize: 32,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: 0,
                margin: 0,
                marginTop: 32,
            }}>Let's Work Together!</Text>

            <Text style={{
                color: 'rgba(255, 255, 255, 0.75)',
                fontSize: 18,
                fontWeight: 200,
                textAlign: 'center',
                margin: 16,
                maxWidth: 500,
                marginBottom: '32px',
            }}>If you’re looking for employees or team members please reach out in the way that works best for you. Thanks!</Text>

            <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                maxWidth: 800,
                gap: 16,
            }}>
                <View style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: 24,
                    textAlign: 'center',
                    marginLeft: -8,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 8,
                }}>
                    <PhotoComponent
                        photo={photos.pdf}
                        resolution={1080}
                        style={{
                            width: '48px',
                            height: 'auto',
                        }}
                    />
                    <button
                        onClick={handleDownload}
                        type="button"
                        style={{
                            color: 'rgba(0, 0, 0, 0.75)',
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            borderRadius: '4px',
                            padding: '8px 16px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.fontSize = '18px';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.fontSize = '16px';
                        }}

                    >
                        Download Resume
                    </button>
                </View>

                <View style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: 24,
                    textAlign: 'center',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 8,
                }}>
                    <PhotoComponent
                        photo={photos.gmail}
                        resolution={1080}
                        style={{
                            width: '24px',
                            height: 'auto',
                        }}
                    />
                    <a
                        href="mailto:methan@umich.edu"
                        style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'}
                    >methan@umich.edu </a>
                </View>

                <View style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: 24,
                    textAlign: 'center',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 8,
                }}>
                    <PhotoComponent
                        photo={photos.phone}
                        resolution={1080}
                        style={{
                            width: '24px',
                            height: 'auto',
                        }}
                    />
                    <a
                        href="tel:1-734-318-7310"
                        style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'}
                    >(734) 318-7310</a>
                </View>

                <View style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: 24,
                    textAlign: 'center',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 8,
                }}>
                    <PhotoComponent
                        photo={photos.linkedIn}
                        resolution={1080}
                        style={{
                            width: '24px',
                            height: 'auto',
                        }}
                    />
                    <a
                        href="https://www.linkedin.com/in/ethan-mcintyre68/"
                        style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'}
                    >https://www.linkedin.com/in/ethan-mcintyre68/</a>
                </View>

                <View style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: 24,
                    textAlign: 'center',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 8,
                }}>
                    <PhotoComponent
                        photo={photos.github}
                        resolution={1080}
                        style={{
                            width: '24px',
                            height: 'auto',
                        }}
                    />
                    <a
                        href="https://github.com/jorelm68"
                        style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'}
                    >https://github.com/jorelm68</a>
                </View>

                <View style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: 24,
                    textAlign: 'center',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 8,
                }}>
                    <PhotoComponent
                        photo={photos.leetcode}
                        resolution={1080}
                        style={{
                            width: '24px',
                            height: 'auto',
                        }}
                    />
                    <a href="https://leetcode.com/jorelm68/" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'}
                    >https://leetcode.com/jorelm68/</a>
                </View>

                <View style={{
                    display: 'flex',
                    paddingBottom: 128,
                    backgroundColor: 'transparent',
                }} />
            </View>
        </Page>
    )
}