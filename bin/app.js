jQuery(function(){

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

	$('.convert').click(function(){

		// kunci gabung

		calon_kunci_gabung = kunci.replace(/ /g, '');
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

		jawaban_gabung_dulu = jawaban.replace(/ /g, '');

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

		// membuat subyek

		subyek = [];
		for (n in list_jawaban){
			subyek[n] = 'siswa_' + n;
		}

		// anates

		calon_anates = '';
		calon_anates += '<?xml version="1.0"?>\
<ANATES file_version="4.0.2">\
    <Data_Mentah>\
        <Kunci>';
        calon_anates += subyek[0];
        calon_anates += '</Kunci>\
        <JumSubyek>'+list_jawaban.length+'</JumSubyek>\
        <JumButir>'+list_kunci.length+'</JumButir>\
        <JumPilihan>'++'</JumPilihan>\
        <IsNeedRecalc>-1</IsNeedRecalc>\
        <NoButir>';
        new Set()
        jawaban_anates.val(calon_anates);

	});

});