# MIR Project
Final project of Music Information Retrival about Falsettos

This project was highly influenced by The Pudding's ["Are Men Singing Higher in Pop Music?"](https://pudding.cool/2019/08/register/) piece. You can check more about their project (and their databases) on these two links: [falsetto-story](https://github.com/the-pudding/falsetto-story) and [falsetto-site](https://github.com/the-pudding/falsetto-site).

*Index:*
1. [The Data](#the-data)
1. [Songs](#songs)
1. [Spleeter](#spleeter)
1. [Essentia](#essentia)
1. [The Classifier](#classifier) 


## The Data:

The data was collected from The Pudding, Spotify and Essentia.

### Removed data:
Some songs had missing info (`NaN` values in *falsetto* e.g.) and was removed. Moreover we filtered the data a little bit:

1. On [gender_values.md](gender_values.md) you'll find a list of songs whose gender value we could't find as they were instrumental. We removed them from our data.
1. On [not_avaliable.md](not_avaliable.md) you'll find songs we couldn't scrap info from Spotify. We also removed them.

### Our Dataframes:

1. [main.csv](main.csv): Has all the information extracted with Essentia, plus gender, spotify_id and falsetto. We used it on machine learning models.
1. [dataframe.csv](dataframe.csv): Overall dataframe. Has basically all the data.
1. [spotify.csv](data-analysis/spotify.csv): Is a part of `dataframe.csv` but with only the spotify info.
1. [append.csv](csv_output/append.csv): Unites all the outputs from Essentia. 


## Songs
You can listen/see *almost* every song used in this project in one of the following playlists - we had to split them due to Spotify's 10000 song limit.

1. [falsetto Pt.1](https://open.spotify.com/playlist/5G2ada6BBgbe2wPfWYZMcC?si=UvIydan6RQ-ZirLCAk2O8g)
2. [falsetto Pt.2](https://open.spotify.com/playlist/7hZAZWkWFoCNbcqbONAQ1l?si=IELx-i6KQXmaKWDnZY4-6g)
3. [falsetto Pt.3](https://open.spotify.com/playlist/1U8FfPx2CpIx2ViM086zYb?si=CzxmNviZQhWZOC_PJld14w)

### Download:
We downloaded the songs using [spotify-dl](https://github.com/SathyaBhat/spotify-dl) with some minor changes. To download a spotify playlist we used:

```
spotify_dl -V -l PLAYLIST_LINK -o songs/ --skip_mp3 -s yes
```
Where `PLAYLIST_LINK` was one of the 3 created ones.

You can download a song by using:

```
spotify_dl -V -l SONG_LINK -o songs/ --skip_mp3 -s yes;
```

## Spleeter

We used [Deezer's Spleeter](https://github.com/deezer/spleeter) to create voice only versions of the songs. We used their [Google Colab](https://colab.research.google.com/github/deezer/spleeter/blob/master/spleeter.ipynb) environment. 


## Essentia

We used [Essentia](https://github.com/MTG/essentia) to extract information on the songs available. 

### Method
Our extraction method can be seen at [extract.py](extract.py). The extraction results are available at [csv_output](csv_output). 

We concatenated the information using [joiner.py](joiner.py). The final results are saved onto [main.csv](main.csv). 

## Classifier

We tried different classification techniques on the data. As it can be seen, the data is very unbalanced and for this specific project our main goal was to stabilish the database.

The classifier file is [classifier_raw.ipynb](classifier_raw.ipynb).
