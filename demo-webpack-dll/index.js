import Dialog from './modules/dialog';


$('#BtnToast').on('click',function(){
	const dialog = new Dialog();
	dialog.notice();
});

$('#BtnSwal').on('click',function(){
	const dialog = new Dialog();
	dialog.confirm();
});