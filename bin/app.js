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

		// kunci per lima

		calon_kunci_per_lima = kunci.replace(/...../g, '\1\t');
		kunci_per_lima.val(calon_kunci_per_lima);

	});

});