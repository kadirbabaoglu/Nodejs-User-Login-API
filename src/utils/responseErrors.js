class ResponseError {
    constructor(data = null , message = null , status = null){
        this.data = data,
        this.message = message,
        this.status = status
    }

    success(response){
        return response.status(200).json({
            success : true,
            data : this.data,
            message : this.message ?? 'İşlem başarılı'
        })
    }

    create(response){
        return response.status(201).json({
            success : true,
            data : this.data,
            message : this.message ?? 'Kayıt başarılı'
        })
    }

    error500(response){
        return response.status(500).json({
            success : false,
            data : this.data,
            message : this.message ?? 'Api de bağlantı hatası veya başka bir durum oluştu'
        })
    }

    error400(response){
        return response.status(400).json({
            success : false,
            data : this.data,
            message : this.message ?? 'Başarısız işlem'
        })
    }

    error401(response){
        return response.status(401).json({
            success : false,
            data : this.data,
            message : this.message ?? 'Başarısız giriş işlemi , Tekrar oturum açın'
        })
    }

    error404(response){
        return response.status(404).json({
            success : false,
            data : this.data,
            message : this.message ?? 'Birseyler ters gitti, İstenen url silinmiş olabilir tekrar deneyin'
        })
    }

    error401(response){
        return response.status(401).json({
            success : false,
            data : this.data,
            message : this.message ?? 'Sisteme fazla istek gelmekte.'
        })
    }



}

module.exports = ResponseError