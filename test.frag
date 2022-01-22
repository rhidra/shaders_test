
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 m = u_mouse / u_resolution;

    st.x -= m.x;
    st.y += m.y - 1.;

    gl_FragColor = vec4(st.x, st.y, 0., 1.);
}