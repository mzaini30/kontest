jQuery(function(){

	$('.convert').click(function(){

		// deklarasi

		kunci = $('#kunci').val();
		jawaban = $('#jawaban').val();
		kunci_gabung = $('#kunci-gabung');
		kunci_per_lima = $('#kunci-per-lima');
		kunci_satuan = $('#kunci-satuan');
		jawaban_per_lima = $('#jawaban-per-lima');
		jawaban_satuan = $('#jawaban-satuan');
		spss = $('#spss');
		jawaban_anates = $('#jawaban-anates');

		// kunci gabung

		calon_kunci_gabung = kunci.replace(/ /g, '').replace(/\t/g, '');
		kunci_gabung.val(calon_kunci_gabung);

		// kunci gabung dulu

		kunci_gabung_dulu = kunci_gabung.val();

		// kunci per lima

		calon_kunci_per_lima = kunci_gabung_dulu.replace(/(.....)/g, '$1\t');
		kunci_per_lima.val(calon_kunci_per_lima);

		// kunci satuan

		calon_kunci_satuan = kunci_gabung_dulu.replace(/(.)/g, '$1\n');
		kunci_satuan.val(calon_kunci_satuan);

		// jawaban gabung dulu

		jawaban_gabung_dulu = jawaban.replace(/ /g, '').replace(/\t/g, '');

		// jawaban per lima

		calon_jawaban_per_lima = jawaban_gabung_dulu.replace(/(.....)/g, '$1\t');
		jawaban_per_lima.val(calon_jawaban_per_lima);

		// jawaban satuan

		calon_jawaban_satuan = jawaban_gabung_dulu.replace(/(.)/g, '$1\t');
		jawaban_satuan.val(calon_jawaban_satuan);

		// intinya ada di kunci gabung dulu dan jawaban gabung dulu

		// list kunci dan list jawaban

		list_kunci = kunci_gabung_dulu.split('');
		list_jawaban = jawaban_gabung_dulu.split('\n');
		
		// spss

		list_spss = list_jawaban.slice();

		for (n in list_spss){
			list_spss[n] = list_spss[n].split('');
		}
		for (x in list_spss){
			for (u in list_spss[x]){
				if (list_spss[x][u] == list_kunci[u]){
					list_spss[x][u] = 1;
				} else if (list_spss[x][u] != list_kunci[u]){
					list_spss[x][u] = 0;
				}
			}
		}
		calon_spss = '';
		for (n in list_spss){
			for (u in list_spss[n]){
				calon_spss += list_spss[n][u];
				calon_spss += '\t';
			}
			calon_spss += '\n';
		}
		spss.val(calon_spss);

		// anates

		calon_anates = '';
		calon_anates += '<?xml version="1.0"?>\
<ANATES file_version="4.0.2">\
    <Data_Mentah>\
        <Kunci>';
        calon_anates += kunci_gabung_dulu;
        // main set seperti di python
        set = {};
        for (n in list_kunci){
        	set[list_kunci[n]] = true;
        }
        jumlah_pilihan = [];
        for (n in set){
        	jumlah_pilihan.push(n);
        }
        calon_anates += '</Kunci>\
        <JumSubyek>'+list_jawaban.length+'</JumSubyek>\
        <JumButir>'+list_kunci.length+'</JumButir>\
        <JumPilihan>'+jumlah_pilihan.length+'</JumPilihan>\
        <IsNeedRecalc>-1</IsNeedRecalc>\
        <NoButir>';
        n = 1;
        while (n < (list_kunci.length + 1)){
        	calon_anates += '<NOBTR>'+n+'</NOBTR>';
        	n++;
        }
        n = 0;
        calon_anates += '</NoButir>\
        <Jawaban>\
            <JumItem>'+list_jawaban.length+'</JumItem>';
		z = 1;
		for (n in list_jawaban){
			calon_anates += '<Subyek>\
                <Nama>siswa_'+z+'</Nama>\
                <NoSubyek>'+z+'</NoSubyek>\
                <Jwb>'+list_jawaban[n]+'</Jwb>\
            </Subyek>';
            z++;
		}
		z = 0;
		calon_anates += '</Jawaban>\
    </Data_Mentah>\
    <Data_Skor>\
        <Rata2>0</Rata2>\
        <SD>0</SD>\
        <IsUrutkanBerdSkor>0</IsUrutkanBerdSkor>\
        <JumButir>0</JumButir>\
        <BobotBetul>1</BobotBetul>\
        <BobotSalah>0</BobotSalah>\
        <Kunci></Kunci>\
        <NoButir/>\
        <Skor>\
            <JumItem>0</JumItem>\
        </Skor>\
    </Data_Skor>\
</ANATES>';
		jawaban_anates.val(calon_anates);

	});

});