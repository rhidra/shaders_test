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
  st += .5;
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
  vec2 st_ = gl_FragCoord.xy / u_resolution.xy;
  vec2 st = st_;

  float tiling = 30. + 10.*cos(u_time/2.);
  st -= .5;
  st = tile(st, vec2(tiling));
  
  float thickness = 0.1;
  vec2 w = vec2(.2 + .1+.5 * abs(cos(u_time*3.)));

  float contours = 0.;
  vec2 st1 = rotate(PI / 4.) * st;
  contours += boxContour(st1, w, thickness);

  vec2 st2 = (st - 1.) * rotate(PI / 4.);
  contours += boxContour(st2, w, thickness);

  vec2 st3 = (st - vec2(1., 0.)) * rotate(PI / 4.);
  contours += boxContour(st3, w, thickness);

  vec2 st4 = (st - vec2(0., 1.)) * rotate(PI / 4.);
  contours += boxContour(st4, w, thickness);

  float cubes = box(st1, w) + box(st2, w) + box(st3, w) + box(st4, w);
  float bgContours = boxContour(st - .5, vec2(1.), thickness/2.) * (1. - cubes);
  float bg = box(st - .5, vec2(1.)) * (1. - cubes);

  contours += bgContours;

  // Composition
  vec3 color = vec3(0.);
  st = (st_ - .5)*tiling;
  float d = sin(length(st) * u_time);
  color += (1. - contours) * cubes * mix(vec3(.278, .247, .807), vec3(.494, .467, .969), d); 
  color += (1. - contours) * vec3(bg);

  // color += vec3(st, 0.);


  gl_FragColor = vec4(color, 1.);
}