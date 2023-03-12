function Container({ componentUl: C ="div", component: S = "section", children, ...props }) {

  return (
    <S className={props.class}>
      <C className={`container container_place_${props.class}`}>
        <h2 className={"section-title " + (props.mix ? `section-title_place_${props.mix}` : "")}>{props.title}</h2>
        <div className={"section-line " + (props.mix ? `section-line_place_${props.mix}` : "")} />
        {children}
      </C>
    </S>
  )
}

export default Container;
