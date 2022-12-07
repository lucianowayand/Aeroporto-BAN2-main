export default function Warning(props) {
    return (
        <>
            {props.message.text != "" ?
                <div className={props.message.error ? "warning-error" : "warning-success"}>
                    <h3>{props.message.text}</h3>
                </div>
                : null}
        </>
    )
}