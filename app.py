import re
import os

jawaban_list_lima = []
jawaban_list_satuan = []

os.system("rm -rf hasil")
os.system("mkdir hasil")

with open("kunci.txt") as kunci, \
open("jawaban.txt") as jawaban, \
open("hasil/kunci gabung.txt", "w") as kunci_gabung, \
open("hasil/kunci satuan.txt", "w") as kunci_satuan, \
open("hasil/kunci per lima.txt", "w") as kunci_per_lima, \
open("hasil/jawaban per lima.txt", "w") as jawaban_per_lima, \
open("hasil/jawaban satuan.txt", "w") as jawaban_satuan:
	
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