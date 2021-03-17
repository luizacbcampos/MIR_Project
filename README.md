# MIR Project
Final project of Music Information Retrival about Falsettos

This project was highly influenced by The Pudding's ["Are Men Singing Higher in Pop Music?"](https://pudding.cool/2019/08/register/) piece. You can check more about their project (and their databases) on these two links: [falsetto-story](https://github.com/the-pudding/falsetto-story) and [falsetto-site](https://github.com/the-pudding/falsetto-site).

## The Data:

The data was collected from The Pudding, Spotify and _something_.

### Removed data:
Some songs had missing info (`NaN` values in *falsetto* e.g.) and was removed. Moreover we filtered the data a little bit:

1. On [gender_values.md](gender_values.md) you'll find a list of songs whose gender value we could't find as they were instrumental. We removed them from our data.
1. On [not_avaliable.md](not_avaliable.md) you'll find songs we couldn't scrap info from Spotify. We also removed them.

### Our Dataframes:

1. [dataframe.csv](dataframe.csv): Overall dataframe. Has basically all the data.
1. [spotify.csv](data-analysis/spotify.csv): Is a part of `dataframe.csv` but with only the spotify info.


