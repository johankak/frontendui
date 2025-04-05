/**
 * A component for displaying the `scalar` attribute of an group entity.
 *
 * This component checks if the `scalar` attribute exists on the `group` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the GroupScalarAttribute component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {*} [props.group.scalar] - The scalar attribute of the group entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const groupEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <GroupScalarAttribute group={groupEntity} />
 */
export const GroupScalarAttribute = ({group}) => {
    const {scalar} = group
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}