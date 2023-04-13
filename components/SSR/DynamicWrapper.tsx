import dynamic from "next/dynamic"
import { Fragment, Suspense } from "react"

/**
 * @description Wrapper element that abstracts creation of dynamicly-imported components. Useful for cases where a component needs to be lazy-loaded in
 * @param children
 * @param fallback lets you display a fallback until its children have finished loading
 * @example 
 * Here is a simple example
 *  ```
* <DynamicWrapper>
*  <Navigation />
* </DynamicWrapper>
 * ```
 */
const DynamicWrapper = ({
    children,
    fallback = null
}) => {

    return (
        <Suspense fallback={fallback}>
            <Fragment>
                {children}
            </Fragment>
        </Suspense>
    )
}

export default dynamic(() => Promise.resolve(DynamicWrapper), {
    ssr: false
})