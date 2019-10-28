const {format, parseISO} = require('date-fns')
const pt = require('date-fns/locale/pt')

const Mail = require('../../lib/Mail')

class CancelationMail{
    get key(){
        return 'CancelationMail'
    }

    async handle({data}){

        const {appointment} = data

        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento Cancelado - GoBarber',
            template: 'cancellation',
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: format(parseISO(appointment.date),
                "'dia' dd 'de' MMMM 'de' yyyy', ás' h:mm'h'",
                {locale: pt}),
            }
        })
    }
}

module.exports = new CancelationMail()