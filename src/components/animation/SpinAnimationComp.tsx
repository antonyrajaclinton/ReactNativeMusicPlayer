import { useRef, useEffect, PropsWithChildren, FC, memo } from "react";
import { Animated, Easing } from "react-native";


const SpinAnimationComp: FC<PropsWithChildren> = ({ children }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        rotateAnim.setValue(0);
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);
    const spinInterpolation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
  
    return (
        <>
            <Animated.View style={{ transform: [{ rotate: spinInterpolation }] }}>
                {children}
            </Animated.View>
        </>
    )
}

export default memo(SpinAnimationComp)
