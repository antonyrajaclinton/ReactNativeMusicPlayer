import { useRef, useEffect, PropsWithChildren, FC, memo } from "react";
import { Animated, Easing } from "react-native";

interface SpinAnimationProps extends PropsWithChildren {
  animation?: boolean;
}

const SpinAnimationComp: FC<SpinAnimationProps> = ({ children, animation }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (animation) {
      rotateAnim.setValue(0); // Reset before looping
      animationRef.current = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animationRef.current.start();
    } else {
      animationRef.current?.stop();

      // Animate back to 0 rotation (optional smooth reset)
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }

    return () => {
      animationRef.current?.stop();
    };
  }, [animation, rotateAnim]);

  const spinInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spinInterpolation }] }}>
      {children}
    </Animated.View>
  );
};

export default memo(SpinAnimationComp);
