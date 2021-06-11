import essentia.standard as es
import pandas as pd
import numpy as np
import glob
import csv

def search_folders():
    folders = []    
    for pt in glob.glob('output/*'):
        inside = glob.glob(pt+'/*/')
        folders += inside
    return folders

def is_mute(file_list):
    i = 1
    size = len(file_list)
    for file in file_list:
        print(i, " of ", size," - ", file)
        try:
            row = MusicExt(song, scalar_lowlevel_descriptors)
        except Exception as e:
            raise e
        i += 1


def folder_loop(folder, scalar_lowlevel_descriptors, writer, start=0):
    i = 0
    size = len(glob.glob(folder+"*.mp3"))
    for song in glob.glob(folder+"*.mp3"):
        print(i, " of ", size)
        spotify_id = get_sp_id(song)
        try:
            row = MusicExt(song, scalar_lowlevel_descriptors)
        except Exception as e:
            row = [np.nan]*84
        line = [spotify_id] + row
        writer.writerow(line)
        i += 1

def get_sp_id(file):
    spotify_id = file.split('/')[-1].split('_vocals.mp3')[0]
    return spotify_id

def MusicExt(file, scalar_lowlevel_descriptors):
  features, features_frames = es.MusicExtractor(lowlevelSilentFrames='drop', lowlevelFrameSize = 2048, lowlevelHopSize = 1024, 
                                                lowlevelStats = ['mean', 'stdev'])(file)
  selected_features = [features[descriptor] for descriptor in scalar_lowlevel_descriptors]
  return selected_features

scalar_lowlevel_descriptors = ['lowlevel.average_loudness', 'lowlevel.barkbands_crest.mean',
'lowlevel.barkbands_crest.stdev', 'lowlevel.barkbands_flatness_db.mean', 'lowlevel.barkbands_flatness_db.stdev',
'lowlevel.barkbands_kurtosis.mean', 'lowlevel.barkbands_kurtosis.stdev', 'lowlevel.barkbands_skewness.mean',
'lowlevel.barkbands_skewness.stdev', 'lowlevel.barkbands_spread.mean', 'lowlevel.barkbands_spread.stdev',
'lowlevel.dissonance.mean', 'lowlevel.dissonance.stdev', 'lowlevel.dynamic_complexity', 'lowlevel.erbbands_crest.mean',
'lowlevel.erbbands_crest.stdev', 'lowlevel.erbbands_flatness_db.mean', 'lowlevel.erbbands_flatness_db.stdev',
'lowlevel.erbbands_kurtosis.mean', 'lowlevel.erbbands_kurtosis.stdev', 'lowlevel.erbbands_skewness.mean',
'lowlevel.erbbands_skewness.stdev', 'lowlevel.erbbands_spread.mean', 'lowlevel.erbbands_spread.stdev', 'lowlevel.hfc.mean',
'lowlevel.hfc.stdev', 'lowlevel.loudness_ebu128.integrated', 'lowlevel.loudness_ebu128.loudness_range',
'lowlevel.loudness_ebu128.momentary.mean', 'lowlevel.loudness_ebu128.momentary.stdev', 'lowlevel.loudness_ebu128.short_term.mean',
'lowlevel.loudness_ebu128.short_term.stdev', 'lowlevel.melbands_crest.mean', 'lowlevel.melbands_crest.stdev', 
'lowlevel.melbands_flatness_db.mean', 'lowlevel.melbands_flatness_db.stdev', 'lowlevel.melbands_kurtosis.mean',
'lowlevel.melbands_kurtosis.stdev', 'lowlevel.melbands_skewness.mean', 'lowlevel.melbands_skewness.stdev',
'lowlevel.melbands_spread.mean', 'lowlevel.melbands_spread.stdev', 'lowlevel.pitch_salience.mean', 'lowlevel.pitch_salience.stdev',
'lowlevel.silence_rate_20dB.mean', 'lowlevel.silence_rate_20dB.stdev', 'lowlevel.silence_rate_30dB.mean',
'lowlevel.silence_rate_30dB.stdev', 'lowlevel.silence_rate_60dB.mean', 'lowlevel.silence_rate_60dB.stdev',
'lowlevel.spectral_centroid.mean', 'lowlevel.spectral_centroid.stdev', 'lowlevel.spectral_complexity.mean',
'lowlevel.spectral_complexity.stdev', 'lowlevel.spectral_decrease.mean', 'lowlevel.spectral_decrease.stdev',
'lowlevel.spectral_energy.mean', 'lowlevel.spectral_energy.stdev', 'lowlevel.spectral_energyband_high.mean',
'lowlevel.spectral_energyband_high.stdev', 'lowlevel.spectral_energyband_low.mean', 'lowlevel.spectral_energyband_low.stdev',
'lowlevel.spectral_energyband_middle_high.mean', 'lowlevel.spectral_energyband_middle_high.stdev',
'lowlevel.spectral_energyband_middle_low.mean', 'lowlevel.spectral_energyband_middle_low.stdev', 'lowlevel.spectral_entropy.mean', 
'lowlevel.spectral_entropy.stdev', 'lowlevel.spectral_flux.mean', 'lowlevel.spectral_flux.stdev', 'lowlevel.spectral_kurtosis.mean', 
'lowlevel.spectral_kurtosis.stdev', 'lowlevel.spectral_rms.mean', 'lowlevel.spectral_rms.stdev', 'lowlevel.spectral_rolloff.mean', 
'lowlevel.spectral_rolloff.stdev', 'lowlevel.spectral_skewness.mean', 'lowlevel.spectral_skewness.stdev', 
'lowlevel.spectral_spread.mean', 'lowlevel.spectral_spread.stdev', 'lowlevel.spectral_strongpeak.mean', 
'lowlevel.spectral_strongpeak.stdev', 'lowlevel.zerocrossingrate.mean', 'lowlevel.zerocrossingrate.stdev']


HEADER = True
FOLDERS = False

folders = []

if folders:
    folders = search_folders()
else:
    folders = ['output/erros/']
    #folders = ['output/pt1/output_pt1_7/']


for folder in folders:
    print("Doing folder: ", folder.split('/')[-2])
    csv_name = folder.split('/')[-2]+'.csv'
    print(csv_name)
    csvfile = open(csv_name, 'a')
    writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    
    if HEADER:
        columns = ['spotify_id'] + scalar_lowlevel_descriptors
        writer.writerow(columns)

    folder_loop(folder, scalar_lowlevel_descriptors, writer)