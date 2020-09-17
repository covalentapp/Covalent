import { useRouter } from "next/router";
import React from "React";

const routingWrapper = (WrappedComponent) => (props) => {
    const router = useRouter();
    return <WrappedComponent {...props} router={router} />;
};

export default routingWrapper;
