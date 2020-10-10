type Ref<T> =
    | ((instance: T | null) => void)
    | React.MutableRefObject<T | null>
    | null;

/**
 * Merges multiple refs into one.
 *
 * @reference https://www.davedrinks.coffee/how-do-i-use-two-react-refs/
 * @param refs the refs to merge
 */
const mergeRefs = <RefType>(...refs: Ref<RefType>[]) => {
    const filteredRefs = refs.filter(Boolean);
    if (!filteredRefs.length) return null;
    if (filteredRefs.length === 0) return filteredRefs[0];
    return (instance: RefType | null) => {
        for (const ref of filteredRefs) {
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        }
    };
};

export default mergeRefs;
