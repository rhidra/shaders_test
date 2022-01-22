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

float circle(vec2 st, float radius) {
  return step(radius, length(st - .5));
}

vec2 tile(vec2 st, vec2 coef) {
  return fract(st * coef);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.);

  st = (st * (50.));

  float moveX = step(1., mod(u_time/1., 2.));

  st.x += mod(u_time, 2.) * step(1., mod(st.y, 2.)) * moveX;
  st.y += mod(u_time, 2.) * step(1., mod(st.x, 2.)) * (1. - moveX);

  st = fract(st);

  // color = vec3(st, 0.);

  color += vec3(circle(st, .3));

  gl_FragColor = vec4(color, 1.);
}