import swal from 'sweetalert';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';


export default class Dialog{

	alert(){
		swal('很好');
	}

	confirm(){
		swal("警告!", "这个操作有一定风险。", "warning");
	}

	notice(){
		toastr.options = {
            positionClass: "toast-top-right", 
            showMethod: 'fadeIn', //['fadeIn','slideDown']
            hideMethod: 'fadeOut', //['fadeOut','slideUp'] //和上面一一对应
            showEasing: 'swing', //['swing','linear']
            hideEasing: 'linear', //['linear','swing']
            closeButton: true, //[true,false]
            showDuration: 300,
            onShown: () => {
                console.log('shown')
            },
            hideDuration: 500, //渐变/行为过度时长，不宜太长
            onHidden: () => {
                console.log('hidden')
            },
            timeOut: 5000, //显示时长，可以适当延长
            newestOnTop: true, //[true,false] default true
            //progressBar:true //有进度条--消失剩余时长
            onclick: (event) => {
                alert('Yep,you clicked me.');
            }
        };

        toastr.warning('我的名字是武松. 你杀了我哥哥武大, 准备受死吧!');
	}
}