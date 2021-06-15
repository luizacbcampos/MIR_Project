import pandas as pd
import numpy as np
import os
import glob

def row_diff(row1, row2):
	'''
		Shows row diff (but only if > 1%)
	'''
	result = row1.compare(row2,keep_shape=False)
	if result.empty:
		print('DataFrame is empty!')
	else:
		result = result.apply(pd.to_numeric)
		result['diff'] = (result.self - result.other)
		result['p'] = result.apply(lambda x: x['diff']/x['self'], axis=1)
		result.drop(result[result.p < 0.01].index, inplace=True)
		print('DataFrame is empty!') if result.empty else print(result)

def catch_row_diff(right, dataframe,_print=False):
	'''
		Shows all rows diff
	'''
	dupli_df = right[right.duplicated(['spotify_id'],keep=False)].sort_values(by=['spotify_id'])
	#print(dupli_df['spotify_id'].unique())

	for ids in dupli_df['spotify_id'].unique():
		indexes = right.loc[right['spotify_id'] == ids].index.to_list()
		print(ids, indexes)
		row_diff(right.loc[indexes[0], :], right.loc[indexes[1], :])
		if _print:
			print(dataframe.loc[dataframe['spotify_id'] == ids, ['falsetto','artist_name', 'song_title', 'spotify_id', 'spotify_artist', 'spotify_song']])
			print("-----------------------------------------------------")

def index_list(dataframe):
	'''
		Get list of songs with problems/duplicates;
	'''
	indexes = []
	try:
		#indexes.append(dataframe[(dataframe.spotify_id == '0RgcOUQg4qYAEt9RIdf3oB') & (dataframe.song_title == 'Star')].index[0])
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
	except:
		print("index list not necessary")


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

def correct_index(dataframe, save=True):
	'''
		Corrects the spotify info from a song (right now only to nan)
	'''
	indexes = index_list(dataframe)
	print([x for x in indexes])
	print(dataframe.columns)
	columns = ['spotify_id', 'spotify_song', 'spotify_artist', 'acousticness', 'danceability', 'duration_ms', 'energy',
	'instrumentalness', 'key', 'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence']

	for index in indexes:
		for c in columns:
			dataframe.at[index, c] = np.nan
	#dataframe = dataframe.drop(dataframe.index[indexes])
	if save: dataframe.to_csv('dataframe.csv', index=False)


def make_short(dataframe):
	'''
		Correcting erros from Spotify's search mechanism. 
	'''

	#dataframe = pd.read_csv('dataframe.csv')
	dataframe = dataframe.drop_duplicates()

	indexes = index_list(dataframe)
	#dataframe = dataframe.drop(dataframe[(dataframe.spotify_id == '') & (dataframe.song_title == '')].index)
	dataframe = dataframe.drop(dataframe.index[indexes])
	dataframe.dropna(subset=['spotify_id'], inplace=True)
	dataframe.drop(columns=['peak_rank', 'points', 'year', 'artist_name', 'song_title', 'weeks_charted_all_time', 'genre','register',
	       'spoken', 'spotify_song', 'spotify_artist','duration_ms'], inplace=True)
	dataframe.to_csv("short.csv", index=False)
	#print(dataframe.columns)

def print_duplicates(df, dataframe):
	'''
		Prints the duplicated rows in df showing their info on dataframe
	'''
	print("Duplicates: ")
	printed = set()
	for index, row in df[df.duplicated(['spotify_id'],keep=False)].sort_values(by=['spotify_id']).iterrows():
		ids = row['spotify_id']
		if ids not in printed:
			print(dataframe.loc[dataframe['spotify_id'] == ids, ['falsetto','artist_name', 'song_title', 'spotify_id', 'spotify_artist', 'spotify_song']])
			printed.add(ids)

def show_duplicates(df):
	'''
		Prints duplicates (their index)
	'''
	res = {}
	print("Show Duplicates: ")
	for index, row in df[df.duplicated(['spotify_id'],keep=False)].sort_values(by=['spotify_id']).iterrows():
		ids = row['spotify_id']
		res[ids] = [index] if ids not in res.keys() else res[ids] + [index]

	for i,v  in res.items():
		print("\t{}: {}".format(i,sorted(v)))


def merge(save=False,short=False, control=False, verbose=False):
	'''
		Merges dataframe.csv with all collected info
	'''
	dataframe = pd.read_csv('dataframe.csv')
	print("Dataframe original: ", len(dataframe))
	
	if short:
		make_short(dataframe)
	df = pd.read_csv('short.csv')
	df = df.drop_duplicates()
	if save:
		df.to_csv('short.csv', index=False)
	
	if verbose: print_duplicates(df,dataframe)
	
	print("Dataframe original (minus duplicates): ", len(df))

	right = pd.read_csv('csv_output/append.csv')
	if control: print('Len append: ', len(right))

	right.dropna(thresh=2, inplace=True)
	if control: print('Len append: ', len(right))
	
	right.dropna(subset=['spotify_id'] ,inplace=True)
	if control: print('Len append: ', len(right))
	
	right = right.drop_duplicates()
	if control: print('Len append: ', len(right))

	if verbose:
		show_duplicates(right)
		print_duplicates(right, dataframe)
		print("Row difference:")
		catch_row_diff(right, dataframe)
	
	right = right.drop_duplicates(['spotify_id']) #diff is under 10% (under 3 in most cases)
	if control: print('Len append: ', len(right))

	result = pd.merge(df, right, how="left", on="spotify_id", validate="one_to_one")
	if control: print("Novo dataframe: ", len(result))
	
	if save:
		result.to_csv("main.csv", index=False)

def full_path(x):
	'''
		Gives the song full path
	'''
	if x['part'] == 'pt3':
		return 'songs/falsetto Pt.3/'+x['spotify_id']+'.'+x['song']
	else:
		part = x['part'].split('_')[0]
		if part == 'pt1':
			return 'songs/falsetto Pt.1/' + x['spotify_id']+'.'+x['song']
		else:
			return 'songs/falsetto Pt.2/' + x['spotify_id']+'.'+x['song']
	return np.nan

def get_info_success(save=False, control=False, verbose=False):
	df = pd.read_csv('songs/guide.csv')
	df['spotify_id'] = df.apply(lambda x: x['song'].split('.')[0], axis=1)
	df['done'] = False

	if verbose: print(df.head(), ' --> ', len(df))
	elif control and not verbose: print(len(df))

	def check_id(x):
		if pd.isnull(x['done_right']): #se x é NaN usa o Y
			return x['done_left']
		else:							#Y é True
			return x['done_right']

	for file in glob.glob('csv_output/pt*.csv'):
		pt = file.split('/')[-1].split('.')[0]
		
		if control or verbose: print(pt)
		df_pt = pd.read_csv(file)
		df_pt['part'] = pt
		df_pt['done'] = True
		df_pt = df_pt[['part', 'spotify_id', 'done']]
		if verbose: print(df_pt.head())

		df = df.merge(df_pt, on=['part', 'spotify_id'], how='left', suffixes=('_left', '_right'))
		df['done'] = df.apply(lambda x : check_id(x),axis=1)
		df = df[['part', 'song','spotify_id','done']]
		#if verbose: print(df.head())

	df['mute'] = np.nan 
	df.loc[df.done == True, 'mute'] = "-"
	if verbose: print(df.head())
	if control: print("{}/{}".format(len(df.loc[df.done == True]),len(df)))
	
	if save:
		df.to_csv('info_on_files.csv', index=False)
	#df.to_csv('info_on_files.csv', index=False)

def print_full(x):
    pd.set_option('display.max_rows', len(x))
    print(x)
    pd.reset_option('display.max_rows')

def check_fill(info, verbose=False):
	'''
		Checks how much of each part is filled
	'''
	d = {}
	for file in glob.glob('csv_output/pt*.csv'):
		pt = file.split('/')[-1].split('.')[0]
		if verbose: print(pt, end=' / ')
		df_pt = pd.read_csv(file)
		d[pt] = df_pt.spotify_id.to_list()
	if verbose: print()

	l = info.groupby('part')['spotify_id'].apply(list).to_dict()
	for key in d.keys():
		for k in l.keys():
			res = len(set(d[key]) & set(l[k])) / float(len(set(d[key]) | set(l[k]))) * 100
			if res > 0 and key != k:
				print("{} - {} = {}".format(key, k, res))
				#prints the ones that don't match

def add_info_list(df, lista, col='mute', value=True):
	'''
		Switches values of spotify_ids in a set column
	'''
	for song in lista:
		index = df.loc[df.spotify_id == song].index
		df.at[index, col] = value


def add_song_column(path):
	df = pd.read_csv(path)
	df['song'] = df.apply(lambda x: x['song'].split('.')[-1], axis=1)
	return df

def basic_opp_info_on_files(path):
	df = add_song_column(path)
	dupli_df = df.drop_duplicates(['spotify_id'],keep=False).sort_values(by=['spotify_id'])
	return dupli_df


def uniting_info_on_file(dupli_df, save=False, control=False, verbose=False):
	'''
		Check the differences of two 'info_on_files' csv
	'''
	
	info = basic_opp_info_on_files('info_on_files.csv')
	if verbose: print("Original order: ", info.columns)
	
	#lado direito é o que eu testei para músicas
	compare = info.merge(dupli_df, on=['spotify_id'], how='outer', suffixes=('_left', '_right'))

	#catch diff between original and compare
	def edit_a_column(compare, column,verbose=False):
	
		def check_done(x):
			if x['done_left']==x['done_right']:
				return x['done_left']
			elif x['done_left']==True and  x['done_right'] == False: #nova adição
				return True
			else:
				return [x['done_left'], x['done_right']]

		def check_song(x):
			if x['song_left']== x['song_right']:
				return x['song_right']
			else:
				return [x['song_left'], x['song_right']]

		def check_mute(x):
			if x['mute_left']== x['mute_right'] or x['mute_left'] == '-' or pd.isnull(x['mute_left']):
				return x['mute_right']
			else:
				return [x['mute_left'], x['mute_right']]

		def check_part(x):
			if x['part_left']== x['part_right']:
				return x['part_right']
			else:
				return [x['part_left'], x['part_right']]

		if column == 'done':
			compare[column] = compare.apply(lambda x : check_done(x), axis=1)
		elif column == 'song':
			compare[column] = compare.apply(lambda x : check_song(x), axis=1)
		elif column == 'mute':
			compare[column] = compare.apply(lambda x : check_mute(x), axis=1)
		elif column == 'part':
			compare[column] = compare.apply(lambda x : check_part(x), axis=1)

		#common part
		r, l = column+'_right', column+'_left'
		compare = compare.drop(columns=[r, l])
		if verbose:
			print("{}?: {}".format(column.capitalize(), compare[column].value_counts().to_dict()))	
		#compare = compare.loc[compare[column] != True]
		return compare

	compare = edit_a_column(compare,'done', verbose=True)
	compare = edit_a_column(compare,'song', verbose=True)
	compare = edit_a_column(compare,'mute', verbose=True)
	compare = edit_a_column(compare,'part', verbose=True)
	
	#reorganizar
	compare = compare[['part', 'song', 'spotify_id', 'done', 'mute']]
	aux = compare.loc[compare['done']==False]
	print("Done?: ", aux.part.value_counts().to_dict())

	if save:
		#makes a copy of info_on_files to csv_output
		df = pd.read_csv('info_on_files.csv')
		df.to_csv('csv_output/info_on_files.csv', index=False)		
	return compare


def add_erros(df, save=False):
	'''
		Adds songs in erros.csv to their respective parts in csv_output
	'''
	df = df.sort_values(by=['part'])
	erros = pd.read_csv("erros.csv")
	l = df.groupby('part')['spotify_id'].apply(list).to_dict()
	
	for key in l.keys():
		file = 'csv_output/'+key+".csv"
		part = pd.read_csv(file)
		df2 = erros[erros['spotify_id'].isin(l[key])]
		novo = part.append(df2, ignore_index=True)
		
		print("{}: {} --> {}".format(file, len(part), len(novo)))
		dupli_df = novo[novo.duplicated(['spotify_id'],keep=False)].sort_values(by=['spotify_id'])
		if dupli_df.empty:
			print('DataFrame is empty!')
		else:
			print(dupli_df)
		if save: novo.to_csv(file, index=False)

def get_error_songs(new_df, verbose=False):
	'''
		This songs don't have info. This function allows you to slowly update it
	'''

	new_df['erro'] = False

	#you can use the next lines to keep track of songs you found
	lista = []
	add_info_list(new_df, lista, col='erro', value=True)
	if verbose:
		print_full(new_df.loc[new_df['erro']==False, ['part', 'spotify_id', 'artist_name', 'song_title']].sort_values(by=['part']))



def check_not_done(verbose=False):
	df = add_song_column('csv_output/info_on_files.csv')
	dupli_df = basic_opp_info_on_files('csv_output/info_on_files.csv')
	dupli_df['mute'] = False
	a = dupli_df.loc[dupli_df['done']==False]

	data = pd.read_csv('dataframe.csv')
	small_data = data[['artist_name', 'song_title', 'spotify_id']]
	new_df = a.merge(small_data, on=['spotify_id'], how='left', suffixes=('_left', '_right'))

	if len(a) > 0:
		print("Len a: {}\t Len new_df: {}".format(len(a), len(new_df)))

		if verbose:
			print_full(new_df.sort_values(by=['part']))

		print("Song file: ", new_df['song'].value_counts().to_dict())
		print("File is mute?: ", new_df['mute'].value_counts().to_dict())

		get_error_songs(new_df, verbose)

	else:
		print("All spotify_id songs have metadata")
	
	return new_df


def retrieve_information(spot, path, verbose=False):
    df = pd.read_csv(path)
    col_spot = spot.columns.to_list()[::-1][0:16]
    col_df = df.columns.to_list()[::-1][0:16]
    print(col_spot)
    print(col_df)
    not_null = len(spot.dropna(subset=['spotify_id']))
    print(not_null)

    if len(spot) - not_null > 0:
        for index, row in df.iterrows():
            spot_index = spot.loc[(spot['artist_name']==row['artist_name']) & (spot['song_title']==row['song_title'])].index.to_list()[0]
            print("{} {}".format(row['artist_name'], row['song_title']))
            for i in range(len(col_spot)):
                print("\t{} {} - {} {}".format(col_spot[i],spot.at[spot_index, col_spot[i]], row[col_df[i]],col_df[i]))
                spot.at[spot_index,col_spot[i]] = row[col_df[i]]
    return spot

def starting_point():

	#first thing to do is correct some dataframe items
	dataframe = pd.read_csv('dataframe.csv')
	correct_index(dataframe, save=True)
	
	#then merge to create short.csv and main.csv
	merge(save=True,short=True, control=True, verbose=False)
	#get the songs and if they were done
	get_info_success(save=True, control=True, verbose=True)


	df = add_song_column('csv_output/info_on_files.csv')
	dupli_df = basic_opp_info_on_files('csv_output/info_on_files.csv')
	dupli_df['mute'] = False

	#CHECK before saving (check your new file is more complete than the one in csv_output/)
	compare = uniting_info_on_file(dupli_df, control=True, verbose=True,save=True)

	#If you wanna check whether you have songs with missing info you can use this:
	new_df = check_not_done(verbose=True)

	
	#Suppose you did but now you have 'erros.csv' with information about those songs
	def fix_mistakes(verbose=False):
		erros = pd.read_csv("erros.csv")
		erros = erros[['spotify_id','lowlevel.average_loudness']]

		m = erros.merge(new_df, on=['spotify_id'], how='left', suffixes=('_left', '_right'))
		m = m[['part', 'spotify_id']]
		if verbose: print_full(m.sort_values(by=['part']))
		add_erros(m)
	fix_mistakes(verbose=True)

#------------------------------------

#INIT CODE
if __name__ == "__main__":

	exit()

	df = pd.read_csv('songs/guide.csv')
	df['spotify_id'] = df.apply(lambda x: x['song'].split('.')[0], axis=1)
	print_full(df[df['spotify_id'].isin(lista)])
	
	from pathlib import Path

	for song in lista:
		print(song)
		string = song+'.*'
		for path in Path('songs').rglob(string):
		    print('\t', path)

	'''
	artist_name       song_title  spotify_id  spotify_artist    spotify_song
	,,,,,,,,,,,,,,,,

	'''



	# 80,21.0,2012,Glee Cast,Bad,


