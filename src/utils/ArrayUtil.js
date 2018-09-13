export default class ArrayUtil {
    /*
     * 更新数组，若item已存在则从数组中将它移除，否则添加进数组
     * */
    static updateArray(arr, item) {
        for (var i = 0, len = arr.length; i < len; i++) {
            var temp = arr[i];
            if (temp === item) {
                arr.slice(i, 1);
                return;
            }
        }
        arr.push(item);
    }
}