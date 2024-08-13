import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { setScreen } from "../../redux/global.reducer";
import Page from "../components/Page";
import api from "../../lib/api";
import { Res } from "../../lib/types";
import PostComponent from "../components/PostComponent";
import constants from "../../lib/constants";
import files from "../../lib/files";

export default function ScrapScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = 'Scrap | Ethan McIntyre';
        dispatch(setScreen('ScrapScreen'));
    }, [dispatch])

    return (
        <Page style={{
            alignItems: 'center',
            paddingTop: constants.HEADER_HEIGHT,
        }}>
            <div dangerouslySetInnerHTML={{
                __html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Scrap</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Basic styling */
        @font-face {
            font-family: 'itim';
            src: url('../assets/fonts/Itim-Regular.ttf') format('truetype');
        }

        @font-face {
            font-family: 'jockeyOne';
            src: url('../assets/fonts/JockeyOne-Regular.ttf') format('truetype');
        }

        body {
            font-family: 'itim';
            margin: 0;
            padding: 0;
            background-color: #000;
            color: #fff;
        }

        header {
            font-family: 'jockeyOne';
            background-color: #111;
            color: #fff;
            padding: 10px 20px;
            text-align: center;
        }


        .columns {
            display: flex;
            justify-content: space-evenly;
            /* Adjust this property based on your layout preference */
            align-items: center;
            /* Align items vertically at the center */
        }

        .text {
            font-family: 'itim';
            background-color: #111;
            color: #fff;
            padding: 10px 20px;
            text-align: center;
            font-size: 18px;
        }

        .container {
            margin: auto;
            overflow: hidden;
        }

        .main-content {
            background-color: #000;
            padding: 20px;
        }

        footer {
            text-align: center;
            padding: 10px 0;
            background-color: #111;
            color: #fff;
        }

        .columns img {
            width: 25%;
            height: auto;
        }

        .quarter img {
            width: 24%;
            height: auto;
        }

        .book img {
            width: 19%;
            height: auto;
        }
    </style>
</head>

<body>
    <header>
        <h1>Scrap</h1>
    </header>

    <div class="container">
        <div class="main-content">
            <h2>What is Scrap?</h2>

            <div class="columns">
                <img src="${files.profileMap}" alt="Profile Map">
                <p class="text">Scrap is an online digital scrapbooking app!<br>
                    It offers a convenient way to document your memories on the go and share them with your
                    friends!<br><br>
                    Display your travels on a map in chronological order!<br>
                    Share with friends by posting <strong>Books!</strong><br>
                    Connect with friends by <strong>threading</strong> books together!<br>
                </p>
            </div>

            <div class="columns">
                <img src="${files.libraryScraps}" alt="Library Scraps">

                <p class="text">Here are some Scraps I've taken on the left, as well as some Books I've made on the
                    right!<br><br>
                    By organizing your Scraps into Books, you and your friends can easily navigate your content!<br><br>
                    Worried about privacy? Others can only see your Scraps when you add them to a <strong>Public
                        Book!</strong><br><br>

                </p>

                <img src="${files.profileBooks}" alt="Profile Books">
            </div>

            <div class="columns">
                <div class="columns">
                    <img src="${files.cameraPrograph}" alt="Camera Prograph">
                    <img src="${files.cameraRetrograph}" alt="Camera Retrograph">
                </div>

                <p class="text">The only way to get images into the app is to <strong>Make Memories NOW!</strong> It's
                    intentionally
                    not possible to import images from elsewhere!<br><br></p>
            </div>


            <p class="text">Below is a Book I made when traveling to one of my dance competitions!<br></p>

            <div class="book">
                <img src="${files.book1}" alt="Scrap 1">
                <img src="${files.book2}" alt="Scrap 2">
                <img src="${files.book3}" alt="Scrap 3">
                <img src="${files.book4}" alt="Scrap 4">
                <img src="${files.book5}" alt="Scrap 5">
                <img src="${files.book6}" alt="Scrap 6">
                <img src="${files.book7}" alt="Scrap 7">
                <img src="${files.book8}" alt="Scrap 8">
                <img src="${files.book9}" alt="Scrap 9">
                <img src="${files.book10}" alt="Scrap 10">
            </div>
        </div>
    </div>

    <footer>
        <p>&copy; 2024 Scrap. All rights reserved.</p>
    </footer>
</body>

</html>` }} />
        </Page>
    )
}