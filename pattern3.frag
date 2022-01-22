#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate(float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a));
}

float boxContour(vec2 st, vec2 size, float thickness) {
  // st += .5;
  float a = thickness / 2.;
  vec2 out_ = step(.5-size/2., st) * step(.5-size/2., 1.-st);
  vec2 in_ = step(.5-size/2.+thickness/2., st) * step(.5-size/2.+thickness/2., 1.-st);
  return out_.x * out_.y * (1. - in_.x * in_.y);
}

float box(vec2 st, vec2 size) {
  st += .5;
  vec2 out_ = step(.5-size/2., st) * step(.5-size/2., 1.-st);
  return out_.x * out_.y;
}

vec2 tile(vec2 st, vec2 coef) {
  return fract(st * coef);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.);

  st = (st * (6. + 20. * fract(u_time/3.)));

  st.x += 2. * cos(u_time) * step(1., mod(st.y, 2.));
  st.y += .1 * cos(u_time*10.) * step(1., mod(st.y, 2.));
  st = fract(st);

  // color = vec3(st, 0.);

  color += vec3(boxContour(st, vec2(1.), .1));

  gl_FragColor = vec4(1. - color, 1.);
}