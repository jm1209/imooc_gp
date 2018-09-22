export default class ArrayUtil {
    /*
     * 更新数组，若item已存在则从数组中将它移除，否则添加进数组
     * */
    static updateArray(arr, item) {
        for (let i = 0, len = arr.length; i < len; i++) {
            let temp = arr[i];
            if (temp === item) {
                arr.slice(i, 1);
                return;
            }
        }
        arr.push(item);
    }

    /*
    * 克隆数组
    * */
    static clone(arr) {
        if (!arr) {
            return [];
        }
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            newArr[i] = arr[i]
        }
        return newArr;
    }
}