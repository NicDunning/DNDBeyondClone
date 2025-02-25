import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export function useSwipe(onSwipeLeft?: any, onSwipeRight?: any, rangeOffset = 4) {

    let firstTouch = 0
    
    // set user touch start position
    function onTouchStart(e: any) {
        if(e.nativeEvent.pageX){
            firstTouch = e.nativeEvent.pageX
            // console.log(firstTouch)
        }
    }

    // when touch ends check for swipe directions
    function onTouchEnd(e: any){
        if(e.nativeEvent.pageX){
            // get touch position and screen size
            const positionX = e.nativeEvent.pageX
            const range = windowWidth / rangeOffset

            // check if position is growing positively and has reached specified range
            if(positionX - firstTouch > range){
                onSwipeRight && onSwipeRight()
            }
            // check if position is growing negatively and has reached specified range
            else if(firstTouch - positionX > range){
                onSwipeLeft && onSwipeLeft()
            }
        }
        else if(e.nativeEvent.velocity){
            if (e.nativeEvent.velocity.x > 1.5 ){
                onSwipeRight && onSwipeRight()
            }
            else if (e.nativeEvent.velocity.x < -1.5){
                onSwipeLeft && onSwipeLeft()
            }
        }
    }

    return {onTouchStart, onTouchEnd};
}