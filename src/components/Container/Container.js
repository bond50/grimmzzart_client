import React from "react";

const Container = ({children, containerClass, class1}) => {
    return (
        <section className={class1}>
            <div
                className={`container-xxl ${containerClass}`}>
                {children}
            </div>
        </section>
    );
};

export default Container;
