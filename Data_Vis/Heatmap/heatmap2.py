import pandas as pd
from sklearn import preprocessing

df = pd.read_csv("./MIR/dataframe.csv")

df = df.groupby('year').mean()[["acousticness", "danceability", "energy","instrumentalness", "liveness", "loudness", "speechiness"]]

x = df.values #returns a numpy array
min_max_scaler = preprocessing.MinMaxScaler()
x_scaled = min_max_scaler.fit_transform(x)

ind = []
for i in range(1958, 2020):
    ind.append(i)

df = pd.DataFrame(x_scaled, index=ind, 
                    columns=["acousticness", "danceability", "energy","instrumentalness", "liveness", "loudness", "speechiness"])


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
        f.write(str(row.acousticness))
        f.write('\n')
        #danceability
        f.write(str(item))
        f.write(',')
        f.write('danceability,')
        f.write(str(row.danceability))
        f.write('\n')
        #energy
        f.write(str(item))
        f.write(',')
        f.write('energy,')
        f.write(str(row.energy))
        f.write('\n')
        #instrumentalness
        f.write(str(item))
        f.write(',')
        f.write('instrumentalness,')
        f.write(str(row.instrumentalness))
        f.write('\n')
        #liveness
        f.write(str(item))
        f.write(',')
        f.write('liveness,')
        f.write(str(row.liveness))
        f.write('\n')
        #loudness
        f.write(str(item))
        f.write(',')
        f.write('loudness,')
        f.write(str(row.loudness))
        f.write('\n')
        #speechiness
        f.write(str(item))
        f.write(',')
        f.write('speechiness,')
        f.write(str(row.speechiness))
        f.write('\n')


    

# df.to_csv("metrics_by_year.csv")