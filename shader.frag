
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 m = u_mouse / u_resolution;

    vec4 a = vec4(1.,0.,0.,1.);
    vec4 b = vec4(0.,.3,1.,1.);

    float t = sqrt(1. - pow(-1. + m.x*4. * st.x, 2.));

    gl_FragColor = mix(a, b, t);
}