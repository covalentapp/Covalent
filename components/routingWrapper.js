import { useRouter } from "next/router";
//import { useNavigation } from "framer";
import React from "react";

const routingWrapper = (WrappedComponent) => (props) => {
    const router = useRouter();
    //const navigation = useNavigation();
    return <WrappedComponent {...props} router={router} /*navigation={navigation}*//>;
};

export default routingWrapper;
