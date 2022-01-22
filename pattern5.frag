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

vec2 rotateSt(vec2 st, float a) {
  st -= .5;
  st = rotate(a) * st;
  st += .5;
  return st;
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

  st = fract(st * 10.);

  st = (st * 2.);
  float index = 0.;
  index += step(1.0, mod(st.x, 2.));
  index += step(1.0, mod(st.y, 2.)) * 2.;

  if (index == 1.) {
    st = rotateSt(st, PI * .5);
  } else if (index == 2.) {
    st = rotateSt(st, PI * -.5);
  } else if (index == 3.) {
    st = rotateSt(st, PI);
  }

  st = fract(st);

  color = vec3(step(st.x, st.y));
  gl_FragColor = vec4(color, 1.);
}