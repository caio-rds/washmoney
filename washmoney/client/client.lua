local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")
vRP = Proxy.getInterface("vRP")

wSH = {}
Tunnel.bindInterface("washmoney", wSH)
vSERVER = Tunnel.getInterface("washmoney")


local opened_v4 = ''
local getin_pc = {
    {731.29,-799.89,18.08,"Flipper"},
    {-564.31,231.1,74.9,"Hackerspace"}
}
-----------------------------------------------------------------------------------------------------------------------------------------
--  THREAD TO SHOW NUI
-----------------------------------------------------------------------------------------------------------------------------------------
function wSH.start_Thread()
    Citizen.CreateThread(function()
        while true do        
            local ped = PlayerPedId()
            for k,v in pairs(getin_pc) do
                local x,y,z = table.unpack(GetEntityCoords(ped))
                local distance = Vdist(x,y,z,v[1],v[2],v[3])
                if distance < 5 then
                    DrawMarker(23,v[1],v[2],v[3]-0.9,0,0,0,0,0,0,1.25,1.25,0.2,52,119,235,100,0,0,0,0)
                    if distance <= 1.5 then
                        if IsControlJustPressed(0,38) and vSERVER.checkPerm(v[4]) then
                            TriggerEvent('emotes','digitar')                        
                            SetNuiFocus(true, true)
                            SendNUIMessage({ action = 'open'})
                            opened_v4 = v[4]
                        end
                    end
                end
            end 
            Citizen.Wait(4)
        end
    end)
end
-----------------------------------------------------------------------------------------------------------------------------------------
--  FUNCTION TO DEV - DESACTIVE THE FUNCTION ABOVE AND ACTIVE THIS THREAD HERE
-----------------------------------------------------------------------------------------------------------------------------------------
-- Citizen.CreateThread(function()
--     while true do        
--         local ped = PlayerPedId()
--         for k,v in pairs(getin_pc) do
--             local x,y,z = table.unpack(GetEntityCoords(ped))
--             local distance = Vdist(x,y,z,v[1],v[2],v[3])
--             if distance < 5 then
--                 DrawMarker(23,v[1],v[2],v[3]-0.9,0,0,0,0,0,0,1.25,1.25,0.2,52,119,235,100,0,0,0,0)
--                 if distance <= 1.5 then
--                     if IsControlJustPressed(0,38) and vSERVER.checkPerm(v[4]) then
--                         TriggerEvent('emotes','digitar')                        
--                         SetNuiFocus(true, true)
--                         SendNUIMessage({ action = 'open'})
--                         opened_v4 = v[4]
--                     end
--                 end
--             end
--         end 
--         Citizen.Wait(4)
--     end
-- end)
--------------------------------------------------------------------------------------------------------------------------------------------------
-- CLOSE NUI
--------------------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("close", function(data, cb)  
    SetNuiFocus(false,false)
    SendNUIMessage({ action = "close" })
    opened_v4 = ''
    vRP.stopAnim()
end)
--------------------------------------------------------------------------------------------------------------------------------------------------
-- VALUE TO BE CLEANED
--------------------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("washer", function(data, cb)  
    if data.value ~= nil then
        vSERVER.new_Wash(data.value,opened_v4)
    end
end)
--------------------------------------------------------------------------------------------------------------------------------------------------
-- GET LIMIT FUNCTION
--------------------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("get_limite", function(data, cb)  
    local lim = vSERVER.getLimite(opened_v4)
    if lim then
        cb({lim = lim})
    end
end)
--------------------------------------------------------------------------------------------------------------------------------------------------
-- INCREASE LIMIT
--------------------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("increase_limite", function(data, cb) 
    if data.value ~= nil then 
        local bool, msg, lim = vSERVER.add_Pendrive(data.value,opened_v4)
        if msg then
            cb({msg = msg, lim = lim})
        end
    end
end)
--------------------------------------------------------------------------------------------------------------------------------------------------
-- RETURN OPENED PLACE NUI
--------------------------------------------------------------------------------------------------------------------------------------------------
function wSH.returnOpened()
    if opened_v4 ~= '' or opened_v4 ~= nil then
        return opened_v4
    end
end