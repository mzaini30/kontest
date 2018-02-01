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

		// spss

		list_kunci = kunci_gabung_dulu.split('');
		list_jawaban = jawaban_gabung_dulu.split('\n');
		for (n in list_jawaban){
			list_jawaban[n] = list_jawaban[n].split('');
		}
		for (x in list_jawaban){
			for (u in list_jawaban[x]){
				if (list_jawaban[x][u] == list_kunci[u]){
					list_jawaban[x][u] = 1;
				} else if (list_jawaban[x][u] != list_kunci[u]){
					list_jawaban[x][u] = 0;
				}
			}
		}
		

	});

});