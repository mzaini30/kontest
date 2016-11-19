import re
import os

jawaban_list_lima = []
jawaban_list_satuan = []

os.system("mkdir hasil")

with open("kunci.txt") as kunci, \
open("jawaban.txt") as jawaban, \
open("nama.txt") as nama_dan_gender, \
open("hasil/kunci gabung.txt", "w") as kunci_gabung, \
open("hasil/kunci satuan.txt", "w") as kunci_satuan, \
open("hasil/kunci per lima.txt", "w") as kunci_per_lima, \
open("hasil/jawaban per lima.txt", "w") as jawaban_per_lima, \
open("hasil/jawaban satuan.txt", "w") as jawaban_satuan, \
open("hasil/jawaban anates.ana", "w") as jawaban_anates, \
open("hasil/nama.txt", "w") as nama, \
open("hasil/nama plus gender.txt", "w") as nama_plus_gender, \
open("hasil/spss.txt", "w") as spss:

	# nama plus gender
	nama_dan_gender_list = nama_dan_gender.read().splitlines()
	for x in nama_dan_gender_list:
		nama_plus_gender.write("%s\n" % x)

	# nama
	nama_list = nama_dan_gender_list
	for n in range(len(nama_list)):
		nama_list[n] = nama_list[n].replace("\tperempuan", "").replace("\tlaki-laki", "")
	for x in nama_list:
		nama.write("%s\n" % x)
	
	# ambil kunci
	kunci_list = kunci.read().splitlines()
	for n in range(len(kunci_list)):
		kunci_list[n] = kunci_list[n].replace(" ", "")

	# ambil jawaban
	jawaban_list = jawaban.read().splitlines()
	for n in range(len(jawaban_list)):
		jawaban_list[n] = jawaban_list[n].replace(" ", "")

	# kunci gabung
	kunci_gabung.write(kunci_list[0])

	# kunci satuan
	kunci_list_list = list(kunci_list[0])
	for x in kunci_list_list:
		kunci_satuan.write("%s\n" % x)

	# kunci per lima
	kunci_list_lima = re.findall(".....", kunci_list[0])
	for x in kunci_list_lima:
		kunci_per_lima.write("%s\t" % x)

	# jawaban per lima
	for n in range(len(jawaban_list)):
		jawaban_list_lima.append(re.findall(".....", jawaban_list[n]))
	for x in jawaban_list_lima:
		for a in x:
			jawaban_per_lima.write("%s\t" % a)
		jawaban_per_lima.write("\n")

	# jawaban satuan
	for n in range(len(jawaban_list)):
		jawaban_list_satuan.append(re.findall(".", jawaban_list[n]))
	for x in jawaban_list_satuan:
		for a in x:
			jawaban_satuan.write("%s\t" % a)
		jawaban_satuan.write("\n")

	# jawaban anates
	jumlah_subjek = len(jawaban_list)
	jumlah_butir = len(kunci_list_list)
	jumlah_pilihan = len(list(set(kunci_list_list)))

	# spss
	spss_list = jawaban_list
	for n in range(len(spss_list)):
		spss_list[n] = list(spss_list[n])
	for x in spss_list:
		for u in range(len(x)):
			if x[u] == kunci_list_list[u]:
				x[u] = 1
			else:
				x[u] = 0
	for x in spss_list:
		for y in x:
			spss.write(str(y) + "\t")
		spss.write("\n")

	jawaban_anates.write("""<?xml version="1.0"?>
<ANATES file_version="4.0.2">
    <Data_Mentah>
        <Kunci>""")
	jawaban_anates.write(kunci_list[0])
	jawaban_anates.write("""</Kunci>
        <JumSubyek>%r</JumSubyek>
        <JumButir>%r</JumButir>
        <JumPilihan>%r</JumPilihan>
        <IsNeedRecalc>-1</IsNeedRecalc>
        <NoButir>""" % (jumlah_subjek, jumlah_butir, jumlah_pilihan))
	n = 1
	while n < (jumlah_butir + 1):
		jawaban_anates.write("""
            <NOBTR>%r</NOBTR>""" % n)
		n += 1
	n = 0
	jawaban_anates.write("""
        </NoButir>
        <Jawaban>
            <JumItem>%r</JumItem>""" % jumlah_subjek)
	z = 1
	for n in range(len(jawaban_list)):
		jawaban_anates.write("""
            <Subyek>
                <Nama>%s</Nama>
                <NoSubyek>%r</NoSubyek>
                <Jwb>%s</Jwb>
            </Subyek>""" % (nama_list[n], z, jawaban_list[n]))
		z += 1
	z = 0
	jawaban_anates.write("""
        </Jawaban>
    </Data_Mentah>
    <Data_Skor>
        <Rata2>0</Rata2>
        <SD>0</SD>
        <IsUrutkanBerdSkor>0</IsUrutkanBerdSkor>
        <JumButir>0</JumButir>
        <BobotBetul>1</BobotBetul>
        <BobotSalah>0</BobotSalah>
        <Kunci></Kunci>
        <NoButir/>
        <Skor>
            <JumItem>0</JumItem>
        </Skor>
    </Data_Skor>
</ANATES>""")