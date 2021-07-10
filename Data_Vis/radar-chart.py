import pandas as pd
from sklearn import preprocessing

df = pd.read_csv("./MIR/dataframe.csv")

decade = df["year"]
for i, year in enumerate(decade):
    decade.iloc[i] = str(year)[:-1]+"0"

df["decade"] = decade

df = df.set_index('decade').groupby('decade').mean()[["acousticness", "danceability", "energy","instrumentalness", "liveness", "loudness", "speechiness"]]

x = df.values #returns a numpy array
min_max_scaler = preprocessing.MinMaxScaler()
x_scaled = min_max_scaler.fit_transform(x)
df = pd.DataFrame(x_scaled, index=["1950", "1960", "1970", "1980", "1990", "2000", "2010"], 
                    columns=["acousticness", "danceability", "energy","instrumentalness", "liveness", "loudness", "speechiness"])


for iter_, row in df.iterrows():
    print ("axis:{}, value:{}".format(iter_, row["liveness"]))