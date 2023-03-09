function Container({ component: S = "section", children, ...props }) {

  return (
    <S className={props.class}>
      <div className={`container container_place_${props.class}`}>
        <h2 className={"section__title " + (props.mix ? `section__title_place_${props.mix}` : "")}>{props.title}</h2>
        <div className={"section__line " + (props.mix ? `section__line_place_${props.mix}` : "")} />
        {children}
      </div>
    </S>
  )
}

export default Container;
