import { F as E, n as L, y as U, r as u, z as I, j as a, R as B, B as h } from './index-bjzi2NvD.js'
import { u as k } from './modals-CKxuF1KC.js'
import { h as V } from './DefaultLayout-DrDCyHef.js'
import { E as H } from './Error403-B8q-ZZUK.js'
import { P as T } from './PageLoading-4CGMC8IO.js'
import { C as s } from './CFormInput-C336hbw-.js'
import { C as D } from './CDatePicker-C3Z-gM9k.js'
import { a as $, C as z } from './CLoadingButton-CoARBVM3.js'
import { C as A } from './CCard-R4u2YyXY.js'
import { C as O } from './CCardHeader-NjExkzpA.js'
import { C as Q } from './CCardTitle-BIeRUkou.js'
import { C as W } from './CCardBody-BY8Sxn6x.js'
import { C as _ } from './CForm-DnX0btTe.js'
import { C as G } from './CCol-DszJQxcp.js'
import { C as J } from './CCardFooter-D4YFsGe1.js'
import { f, p as j } from './parse-n3RXTkBv.js'
import './auth-gSn_sS9R.js'
import './index.esm-BX2-GJNA.js'
import './useForkedRef-CzJsXXcR.js'
import './Transition-L9PLBMST.js'
import './CFocusTrap-CtPSLGIl.js'
const Ce = () => {
  const { id: g } = E(),
    N = L(),
    [C] = U(),
    y = u.useRef(null),
    { detail: e, getDetail: v, detailLoading: q, edit: R, editLoading: b } = k(),
    [t, c] = u.useState({}),
    [M, P] = u.useState(!1),
    l = (r) => {
      const { name: i, value: m } = r.target
      c({ ...t, [i]: m })
    },
    p = (r, i) => {
      c({ ...t, [r]: i })
    },
    F = (r) => {
      r.target.files.length > 0 && c((i) => ({ ...i, file: r.target.files[0] }))
    },
    w = () => {
      c((r) => ({ ...r, file: null })), y.current && (y.current.value = '')
    }
  u.useEffect(() => {
    v({ year: C.get('year'), id: g })
  }, [C]),
    u.useEffect(() => {
      c(() => ({
        given: e == null ? void 0 : e.given,
        firstName: e == null ? void 0 : e.firstName,
        lastName: e == null ? void 0 : e.lastName,
        patronymic: e == null ? void 0 : e.patronymic,
        specialty: e == null ? void 0 : e.specialty,
        qualification: e == null ? void 0 : e.qualification,
        birthDate: e == null ? void 0 : e.birthDate,
        passportNumber: e == null ? void 0 : e.passportNumber,
        certificateNumber: e == null ? void 0 : e.certificateNumber,
        protocolNumber: e == null ? void 0 : e.protocolNumber,
        protocolRegistrationDate: e == null ? void 0 : e.protocolRegistrationDate,
        commissionChairman: e == null ? void 0 : e.commissionChairman,
        file: I + (e == null ? void 0 : e.photo),
      }))
    }, [e]),
    console.log(t)
  const d = [
      {
        children: a.jsx(s, {
          name: 'given',
          value: t.given,
          onChange: l,
          required: !0,
          label: 'Данный',
        }),
      },
      {
        children: a.jsx(s, {
          name: 'firstName',
          value: t.firstName,
          onChange: l,
          required: !0,
          label: 'Имя',
        }),
      },
      {
        children: a.jsx(s, {
          name: 'lastName',
          value: t.lastName,
          onChange: l,
          required: !0,
          label: 'Фамилия',
        }),
      },
      {
        children: a.jsx(s, {
          name: 'patronymic',
          value: t.patronymic,
          onChange: l,
          required: !0,
          label: 'Отчество',
        }),
      },
      {
        children: a.jsx(s, {
          name: 'specialty',
          value: t.specialty,
          onChange: l,
          required: !0,
          label: 'Специализация',
        }),
      },
      {
        children: a.jsx(s, {
          name: 'qualification',
          value: t.qualification,
          onChange: l,
          required: !0,
          label: 'Квалификация',
        }),
      },
      {
        children: a.jsx(D, {
          date: t.birthDate ? new Date(t.birthDate) : null,
          inputDateParse: (r) => j(r, 'yyyy-MM-dd', new Date()),
          inputDateFormat: (r) => f(new Date(r), 'yyyy-MM-dd'),
          onDateChange: (r) => {
            if (r) {
              const i = f(new Date(r), 'yyyy-MM-dd')
              p('birthDate', i)
            } else p('birthDate', '')
          },
          placeholder: 'Выберите время',
          locale: 'en-US',
          required: !0,
          label: 'Дата рождения',
        }),
      },
      {
        children: a.jsx(s, {
          name: 'passportNumber',
          value: t.passportNumber,
          onChange: l,
          required: !0,
          label: 'Номер паспорта',
        }),
      },
      {
        children: a.jsx(s, {
          name: 'certificateNumber',
          value: t.certificateNumber,
          onChange: l,
          required: !0,
          label: 'Номер сертификата',
        }),
      },
      {
        children: a.jsx(s, {
          name: 'protocolNumber',
          value: t.protocolNumber,
          onChange: l,
          required: !0,
          label: 'Номер протокола',
        }),
      },
      {
        children: a.jsx(D, {
          date: t.protocolRegistrationDate ? new Date(t.protocolRegistrationDate) : null,
          inputDateParse: (r) => j(r, 'yyyy-MM-dd', new Date()),
          inputDateFormat: (r) => f(new Date(r), 'yyyy-MM-dd'),
          onDateChange: (r) => {
            if (r) {
              const i = f(new Date(r), 'yyyy-MM-dd')
              p('protocolRegistrationDate', i)
            } else p('protocolRegistrationDate', '')
          },
          placeholder: 'Выберите время',
          locale: 'en-US',
          required: !0,
          label: 'Дата регистрации протокола',
        }),
      },
      {
        children: a.jsx(s, {
          name: 'commissionChairman',
          value: t.commissionChairman,
          onChange: l,
          required: !0,
          label: 'Председатель комиссии',
        }),
      },
      {
        children: a.jsxs(a.Fragment, {
          children: [
            a.jsx(s, { ref: y, type: 'file', onChange: (r) => F(r), label: 'Картинка' }),
            a.jsx($, { color: 'danger', onClick: w, children: 'Удалить' }),
            (t == null ? void 0 : t.file) &&
              a.jsx('div', {
                className: 'w-100',
                children: a.jsx('img', {
                  src: typeof t.file == 'string' ? t.file : URL.createObjectURL(t.file),
                  alt: 'Uploaded',
                  style: { maxWidth: '100%', maxHeight: '500px' },
                }),
              }),
          ],
        }),
      },
    ],
    S = (r) => {
      if ((r.preventDefault(), r.currentTarget.checkValidity() === !1))
        r.preventDefault(),
          r.stopPropagation(),
          d
            .filter((o) => o.children.props.required)
            .map((o) => {
              var x
              const n = o.children.props.value
              ;((x = o.children.props.options) == null ? void 0 : x.length) > 0
                ? ((n == null ? void 0 : n.value) === void 0 ||
                    (n == null ? void 0 : n.value) === null ||
                    (n == null ? void 0 : n.value) === '') &&
                  h.error(`${o.label} - To\'ldiring`)
                : (n == null || n === '') && h.error(`${o.label} - To\'ldiring`)
            })
      else {
        const m = { ...t }
        ;(m.id = g),
          R(g, C.get('year'), m)
            .then((o) => {
              var n
              o != null && o.success
                ? (h.success("Muvaffaqiyatli o'zgardi"), N('/user' + V))
                : h.error((n = o == null ? void 0 : o.error) == null ? void 0 : n.message)
            })
            .catch((o) => console.log('err', o))
      }
      P(!0)
    }
  return q
    ? a.jsx(T, { loading: !0 })
    : e != null && e.id
      ? a.jsxs(A, {
          children: [
            a.jsx(O, {
              children: a.jsxs(Q, {
                className: 'mb',
                children: [e == null ? void 0 : e.name, ' ( ID: ', e == null ? void 0 : e.id, ' )'],
              }),
            }),
            a.jsx(W, {
              children: a.jsxs(_, {
                noValidate: !0,
                validated: M,
                onSubmit: S,
                className: 'row g-3',
                children: [
                  d == null
                    ? void 0
                    : d.map((r, i) =>
                        a.jsx(
                          G,
                          {
                            sm: 6,
                            children: B.cloneElement(r.children, {
                              label: a.jsxs(a.Fragment, {
                                children: [
                                  r.children.props.label,
                                  ' ',
                                  r.children.props.required &&
                                    a.jsx('span', { style: { color: 'red' }, children: '*' }),
                                ],
                              }),
                            }),
                          },
                          i,
                        ),
                      ),
                  a.jsx(J, {
                    className: 'text-end',
                    children: a.jsx(z, {
                      color: 'primary',
                      loading: b,
                      disabled: b,
                      type: 'submit',
                      children: 'Изменить',
                    }),
                  }),
                ],
              }),
            }),
          ],
        })
      : a.jsx(H, { detail: e })
}
export { Ce as default }
