local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")

wSH = {}
Tunnel.bindInterface("washmoney", wSH)
vCLIENT = Tunnel.getInterface("washmoney")


vRP.prepare("vRP/get_limite","SELECT limite FROM vrp_lavagem WHERE org = @org")
vRP.prepare("vRP/set_limite","UPDATE vrp_lavagem SET limite = @limite WHERE org = @org")

function wSH.checkPerm(perm)
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        local nplayer = vRPclient.nearestPlayer(source,5)
        if nplayer then
            TriggerClientEvent("Notify",source,"Amarelo","Sistema em uso.",8000)
            return false            
        else
            if vRP.hasPermission(user_id,perm) or vRP.hasPermission(user_id,'Owner') then
                return true
            end
            return false
        end
    end
end



function wSH.new_Wash(value,org)
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        if vRP.getInventoryItemAmount(user_id,'dollars2') >= parseInt(value) then
            if vRP.tryGetInventoryItem(user_id,'dollars2',parseInt(value),true) then
                vRP.addBank(user_id,parseInt(value))
                wSH.remLimite(parseInt(value),org)
                return true
            end
        else
            return false
        end
    end
end

function wSH.add_Pendrive(value,org)
   local source = source
   local user_id = vRP.getUserId(source)
   local amount_pd = parseInt(value*5000)
   if user_id then
        if vRP.getInventoryItemAmount(user_id,'cpuchip') >= parseInt(value) then
            if vRP.tryGetInventoryItem(user_id,'cpuchip',parseInt(value),true) then          
                if parseInt(amount_pd) > 0 then
                    wSH.incLimite(amount_pd,org)
                    return true,'Limite aumentado com sucesso.',wSH.getLimite(org)
                end
            end
        end
        return false,'Componentes ausentes.'
   end
end

function wSH.getLimite(org)
    local limite = vRP.query('vRP/get_limite',{org = org})
    for k,v in pairs(limite) do
        return v.limite
    end
end

function wSH.remLimite(value,org)
    local lim = wSH.getLimite(org)   
    local new_limite = lim - value
    if new_limite > 0 then
        vRP.execute('vRP/set_limite',{limite = new_limite,org = org})
        return true
    else
        return false
    end    
end

function wSH.incLimite(value,org)
    local lim = wSH.getLimite(org)   
    local new_limite = lim + value
    if new_limite > lim then
        vRP.execute('vRP/set_limite',{limite = new_limite,org = org})
        return true
    else
        return false
    end    
end

function wSH.setLimite(value,org)
    vRP.execute('vRP/set_limite',{limite = value, org = org})
end


AddEventHandler("vRP:playerSpawn",function(user_id,source)
    if source and user_id then
        vCLIENT.start_Thread(source)
    end
end)
















