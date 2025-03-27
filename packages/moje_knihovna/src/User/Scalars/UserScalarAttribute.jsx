/**
 * A component for displaying the `scalar` attribute of an user entity.
 *
 * This component checks if the `scalar` attribute exists on the `user` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the UserScalarAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {*} [props.user.scalar] - The scalar attribute of the user entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const userEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <UserScalarAttribute user={userEntity} />
 */
export const UserScalarAttribute = ({user}) => {
    const {scalar} = user
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}