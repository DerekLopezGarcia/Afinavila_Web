import { useState } from 'react'

const TABS = ['Aviso Legal', 'Política de Privacidad']

const AVISO_LEGAL = `TÉRMINOS GENERALES DE USO

El acceso a los contenidos de las secciones de nuestra APLICACION se hará de acuerdo a la política que establezca la entidad. Asimismo AFINAVILA podrá modificar, en cualquier momento y sin previo aviso, la información contenida en el sitio web, por lo que la entidad no se responsabiliza de que esa información esté actualizada.

RESPONSABILIDAD DE AFINAVILA

Tanto el acceso a esta Web como el uso que pueda hacerse de la información contenida en el mismo es de la exclusiva responsabilidad de quien lo realiza. AFINAVILA no responderá de ninguna consecuencia, daño o perjuicio que pudieran derivarse de dicho acceso o uso de la información. AFINAVILA no se hace responsable de los posibles errores de seguridad que se puedan producir ni de los posibles daños que puedan causarse al sistema de información del usuario, los ficheros o documentos almacenados en el mismo, como consecuencia de la presencia de virus en el ordenador del usuario utilizado para la conexión a los servicios y contenidos de la web, de un mal funcionamiento del navegador o del uso de versiones no actualizadas en el mismo.

Por tanto, EL USUARIO acepta, de forma expresa y sin reservas, que el acceso y la utilización de esta web, se hace bajo su única y exclusiva responsabilidad.

PROPIEDAD INTELECTUAL

AFINAVILA es propietaria de toda la información contenida en esta web, de su diseño gráfico, marcas y logotipos, estando protegidos conforme a lo dispuesto en la Ley de Propiedad Intelectual y en la Ley de Marcas.

IDENTIFICACIÓN

AFINAVILA - JUAN CARLOS LÓPEZ GARCÍA
PSO SAN ROQUE Nº 36, BAJO B - 05003 - ÁVILA - info@afinavila.es`

const PRIVACIDAD = `TRATAMIENTO DE DATOS PERSONALES

En cumplimiento de lo establecido en la normativa aplicable de Protección de Datos, le informamos que los datos serán tratados como RESPONSABLE por AFINAVILA, cuya finalidad del tratamiento es la prestación del servicio que el usuario solicite a través de nuestro formulario de contacto y para ello necesitamos que marque la casilla habilitada que indica la aceptación de esta política, de tal manera que si no lo hace no tendremos su consentimiento expreso y por ello no podremos dar respuesta a su solicitud.

Para la correcta prestación de los servicios ofrecidos por AFINAVILA, es preciso que el usuario conteste a todas y cada una de las preguntas que aparecen en los formularios presentes en nuestro sitio web. El tratamiento de los datos de carácter personal solicitados tendrán como finalidad la respuesta de su solicitud.

Dado el carácter personal de los datos facilitados, AFINAVILA se compromete a tratarlos con estricta confidencialidad, guardando el secreto debido, a este efecto, la entidad ha implantado medidas de seguridad adecuadas.

Le informamos que no se cederán sus datos a terceros ni se realizarán transferencias internacionales de datos.

DERECHOS

Los datos recabados y tratados se conservarán por un plazo de tiempo limitado; dicho plazo será el necesario para cumplir las obligaciones legales impuestas a AFINAVILA por las diferentes normativas aplicables. El usuario como interesado puede ejercer en todo momento los siguientes derechos en la dirección indicada en el Aviso Legal: Derecho de acceso, Derecho de rectificación, Derecho de supresión, Derecho de oposición, Derecho a la limitación del tratamiento, Derecho a la portabilidad.

Para ejercer esos derechos se realizará por escrito dirigido a AFINAVILA a la dirección indicada en el Aviso Legal.

RESPONSABLE DEL TRATAMIENTO DE SUS DATOS

AFINAVILA - JUAN CARLOS LÓPEZ GARCÍA
PSO SAN ROQUE Nº 36, BAJO B - 05003 - ÁVILA - info@afinavila.es`

export default function Legal() {
  const [tab, setTab] = useState(0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-accent mb-8">Información Legal</h1>
      <div className="flex gap-1 mb-8 border-b border-gray-200">
        {TABS.map((label, i) => (
          <button
            key={label}
            onClick={() => setTab(i)}
            className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === i
                ? 'border-primary text-primary'
                : 'border-transparent text-text-gray hover:text-primary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="prose prose-sm max-w-none text-text-gray leading-relaxed whitespace-pre-line">
        {tab === 0 ? AVISO_LEGAL : PRIVACIDAD}
      </div>
    </div>
  )
}
