const detect = (fn: (key: number) => void) => {
    fn(-1)
    document.onkeydown = key => {
        switch (key.keyCode) {
            case 38: // up
                fn(0)
                break;
            case 39: // right
                fn(1)
                break;
                break;
            case 40: // down
                fn(2)
                break;
            case 37: // left
                fn(3)
        }
    }
}

export default detect;