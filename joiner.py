import pandas as pd
import numpy as np
import os
import glob

def index_list(dataframe):
	'''
		Get list of songs with problems/duplicates;
	'''
	indexes = []
	indexes.append(dataframe[(dataframe.spotify_id == '0RgcOUQg4qYAEt9RIdf3oB') & (dataframe.song_title == 'Star')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '0LpE5tfNe15QLvQL4YDi7T') & (dataframe.song_title == 'Bad')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '0dmQv5F4dm9nMxX8zz2x34') & (dataframe.song_title == 'I Want To Be With You')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '0pwYLVXVknPSGUQb39cePC') & (dataframe.song_title == 'Love Me')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '1blZP5x1XQSqQFpTy12rFh') & (dataframe.song_title == 'For The Cool In You')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '1hjNIcn5cvl9x8U44xUMqE') & (dataframe.song_title == 'I Want To Live')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '1uzcPl4GZSU9Ysl1ZcMLTb') & (dataframe.song_title == 'My Baby')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '1zGurRysA9yFI5qa7gaR8O') & (dataframe.song_title == 'Scent Of Attraction')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '3PzsbWSQdLCKDLxn7YZfkM') & (dataframe.song_title == 'Fire')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '3iAvTn62s7rvE6hm6fFodt') & (dataframe.song_title == 'Loser')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '7iMyX6FTRrY4fO8dHQhAUs') & (dataframe.song_title == 'Stronger')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '7qekEQyGFRim7qNhxzkaLo') & (dataframe.song_title == 'Somewhere')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '6W0javyKuVICRsmD8DqQfI') & (dataframe.song_title == 'Kiss')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '4GwbSrCJFRze2tK4H12Zew') & (dataframe.song_title == 'I Love You')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '4MFU8kCLOQD9nV03Gfvrkn') & (dataframe.song_title == 'Dance, Dance, Dance')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '4XcUFQNTiX4IHmA4K51snP') & (dataframe.song_title == 'Take Another Picture')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '4gGYiGsxhPYpsGIttWLwlT') & (dataframe.song_title == 'I Am')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '4jRJWlkCn3pAwezfqFODU3') & (dataframe.song_title == 'You Could Have Been With Me')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '4lhajjgcICdfhRkvWj9Tud') & (dataframe.song_title == 'Here')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '4vGQNeWAh2WKPYsqhp5wSg') & (dataframe.song_title == 'You')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '5GorFaKkP2mLREQvhSblIg') & (dataframe.song_title == 'Life')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '5bcTCxgc7xVfSaMV3RuVke') & (dataframe.song_title == 'E.T.')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '5pgq6Pzyr8iF2Rs7vzC1nd') & (dataframe.song_title == 'Michael')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '5ubvP9oKmxLUVq506fgLhk') & (dataframe.song_title == 'Alive')].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '60NvAO9lx0KmBNAVHIlWN6') & (dataframe.song_title == "I Love You")].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '6K1b1cx8qPa6kFMPdtbdLE') & (dataframe.song_title == "A Little Love")].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '6Ndauo9gCxNjTfklsFYS7b') & (dataframe.song_title == "You")].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '6RzqD964t0xz5yHHdvpEtO') & (dataframe.song_title == "Will You Be Staying After Sunday")].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '6lSVidZXCnOnYAWcgIqVDF') & (dataframe.song_title == "Body")].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '72rQqO217uRMY46c7K8Ws6') & (dataframe.song_title == "Ain't That A Shame!")].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '7GkaclZPWxJujsylkMetsW') & (dataframe.song_title == "20/20")].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '7c8fTb0e6BocxwiyRq8Gz6') & (dataframe.song_title == "He")].index[0])
	indexes.append(dataframe[(dataframe.spotify_id == '42TKLlMFDXauhLzj7zOPUx') & (dataframe.artist_name == 'Janis Joplin')].index[0])


	return indexes

def print_index(dataframe, indexes=False):
	'''
		Print songs that have issues (duplicates);
	'''
	if not indexes:
		indexes = index_list(dataframe)

	for i in sorted(indexes):
		part = int(i/1000) +1
		print("pt-",part, i, dataframe.loc[i, 'spotify_id'])

def make_short():
	'''
		Correcting erros from Spotify's search mechanism. 
	'''

	dataframe = pd.read_csv('dataframe.csv')
	dataframe = dataframe.drop_duplicates()

	indexes = index_list(dataframe)

	#dataframe = dataframe.drop(dataframe[(dataframe.spotify_id == '') & (dataframe.song_title == '')].index)
	dataframe = dataframe.drop(dataframe.index[indexes])
	dataframe.dropna(subset=['spotify_id'], inplace=True)
	dataframe.drop(columns=['peak_rank', 'points', 'year', 'artist_name', 'song_title', 'weeks_charted_all_time', 'genre','register',
	       'spoken', 'spotify_song', 'spotify_artist','duration_ms'], inplace=True)
	dataframe.to_csv("short.csv", index=False)
	#print(dataframe.columns)

def merge():

	make_short()
	dataframe = pd.read_csv('dataframe.csv')
	df = pd.read_csv('short.csv')
	df = df.drop_duplicates()
	#df.to_csv('short.csv', index = False)

	for index, row in df[df.duplicated(['spotify_id'],keep=False)].sort_values(by=['spotify_id']).iterrows():
		ids = row['spotify_id']
		print(dataframe.loc[dataframe['spotify_id'] == ids, ['falsetto','artist_name', 'song_title', 'spotify_id', 'spotify_artist', 'spotify_song']])
		#print(row.to_frame().T)

	print("Dataframe original: ", len(df))


	right = pd.read_csv('csv_output/append.csv')
	right.dropna(thresh=2, inplace=True)

	#right = append_df()
	for index, row in right[right.duplicated(['spotify_id'],keep=False)].sort_values(by=['spotify_id']).iterrows():
		ids = row['spotify_id']
		print(dataframe.loc[dataframe['spotify_id'] == ids, ['falsetto','artist_name', 'song_title', 'spotify_id', 'spotify_artist', 'spotify_song']])

	right = right.drop_duplicates(['spotify_id'])

	result = pd.merge(df, right, how="left", on="spotify_id", validate="one_to_one")
	print("Novo dataframe: ", len(result))
	result.to_csv("main.csv", index=False)

merge()