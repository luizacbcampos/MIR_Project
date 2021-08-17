import pandas as pd
from sklearn import preprocessing

df = pd.read_csv("./MIR/dataframe.csv")

df = df.groupby('year').mean()[["acousticness", "danceability", "energy","instrumentalness", "liveness", "loudness", "speechiness", "spoken", "valence"]]

x = df.values #returns a numpy array
min_max_scaler = preprocessing.MinMaxScaler()
x_scaled = min_max_scaler.fit_transform(x)

ind = []
for i in range(1958, 2020):
    ind.append(i)

df = pd.DataFrame(x_scaled, index=ind, 
                    columns=["acousticness", "danceability", "energy","instrumentalness", "liveness", "loudness", "speechiness", "spoken", "valence"])


with open("metrics_by_year.csv", 'w') as f:
    f.write('year')
    f.write(',')
    f.write('metrics,')
    f.write('count')
    f.write('\n')
    for item, row in df.iterrows():
        # acousticness
        f.write(str(item))
        f.write(',')
        f.write('acousticness,')
        f.write(str(round(row.acousticness, 3)))
        f.write('\n')
        #danceability
        f.write(str(item))
        f.write(',')
        f.write('danceability,')
        f.write(str(round(row.danceability, 3)))
        f.write('\n')
        #energy
        f.write(str(item))
        f.write(',')
        f.write('energy,')
        f.write(str(round(row.energy, 3)))
        f.write('\n')
        #instrumentalness
        f.write(str(item))
        f.write(',')
        f.write('instrumentalness,')
        f.write(str(round(row.instrumentalness, 3)))
        f.write('\n')
        #liveness
        f.write(str(item))
        f.write(',')
        f.write('liveness,')
        f.write(str(round(row.liveness, 3)))
        f.write('\n')
        #loudness
        f.write(str(item))
        f.write(',')
        f.write('loudness,')
        f.write(str(round(row.loudness, 3)))
        f.write('\n')
        #speechiness
        f.write(str(item))
        f.write(',')
        f.write('speechiness,')
        f.write(str(round(row.speechiness, 3)))
        f.write('\n')
        #spoken
        f.write(str(item))
        f.write(',')
        f.write('spoken,')
        f.write(str(round(row.spoken, 3)))
        f.write('\n')
        #valence
        f.write(str(item))
        f.write(',')
        f.write('valence,')
        f.write(str(round(row.valence, 3)))
        f.write('\n')
