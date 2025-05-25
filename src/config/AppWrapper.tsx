import MyNavigations from "./MyNavigations";
import { PaperProvider } from "react-native-paper";

const AppWrapper = () => {
    return (
        <PaperProvider>
            <MyNavigations />
        </PaperProvider>
    )
}

export default AppWrapper
