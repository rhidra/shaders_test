#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


mat2 rotate(in float angle) {
  return mat2(
    cos(angle), -sin(angle),
    sin(angle), cos(angle)
  );
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross_(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) +
            box(_st, vec2(_size/4.,_size));
}

float rotating_cross(in vec2 _st) {
  _st -= vec2(.5);
  _st = rotate(sin(u_time*2.*PI*(1./1.))) * _st;
  _st += vec2(.5);

  return cross_(_st, .2);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  float offset = 0.01;

  vec2 st1 = st + vec2(.0,.001);
  vec2 st2 = st + vec2(.001,.0);
  vec2 st3 = st - vec2(.0,.001);
  vec2 st4 = st - vec2(.001,.0);
  float color = rotating_cross(st);
  float color1 = rotating_cross(st1);
  float color2 = rotating_cross(st2);
  float color3 = rotating_cross(st3);
  float color4 = rotating_cross(st4);

  float final = color;

  gl_FragColor = vec4(vec3(final), 1.);
}